import React, { forwardRef, useEffect, useRef } from 'react'
import { Stage, PixiComponent, useApp } from '@pixi/react'
import useResize from '../hooks/useResize'
import { PLAYER, SPWANERS, VIEW, WORLD_SIZE } from '../AppConstant'
import { Viewport as PixiViewport } from 'pixi-viewport'
import { EventSystem } from 'pixi.js'
import PropTypes from 'prop-types'
import Background from './map/Background'
import { Player } from './entity'
// import Foreground from './map/Foreground'
import DummySpawner from './entity/DummySpawner'
import Dummy from './entity/Dummy'
import useDummiesState, { dummiesAction } from '../hooks/gameState/useDummiesState'
import { playerAction } from '../hooks/gameState/usePlayerState'
import useGameState, { gameStateAction } from '../hooks/gameState/useGameState'
// import GridBuilder from './map/GridBuilder'

const PixiViewportComponent = PixiComponent('Viewport', {
    create: (props) => {
        const events = new EventSystem(props.app.renderer)
        events.domElement = props.app.renderer.view
        const viewport = new PixiViewport({
            screenWidth: props.width,
            screenHeight: props.height,
            worldWidth: WORLD_SIZE.WIDTH,
            worldHeight: WORLD_SIZE.HEIGHT,
            ticker: props.app.ticker,
            events,
        })
        viewport.drag().pinch().wheel().clampZoom()
        viewport.snap(PLAYER.POSITION_START_X, PLAYER.POSITION_START_Y, { removeOnComplete: true })
        return viewport
    },
    willUnmount: (viewport) => {
        viewport.options.noTicker = true
        viewport.destroy({ children: true, texture: true, baseTexture: true })
    },
})

// create a component that can be consumed
// that automatically pass down the app
const Viewport = forwardRef((props, ref) => {
    const app = useApp()
    return (
        <PixiViewportComponent
            ref={ref}
            app={app}
            {...props}

            pointerdown={(e) => {
                gameStateAction.setClickPos(ref.current.toWorld(e.data.global.x, e.data.global.y))
            }}
        />
    )
})

// to avoid rerender the viewport
const ClickManager = () => {
    const {
        clickPos,
    } = useGameState()
    const dummies = useDummiesState()

    useEffect(() => {
        if (!clickPos) return
        const selectedDummies = dummies.filter(dummy => dummy.isSelected)
        if (selectedDummies.length) {
            const changes = selectedDummies.map(dummy => ({ id: dummy.id, target: clickPos, isSelected: false }))
            dummiesAction.updateAll(changes)
            return
        }
        playerAction.setPlayer({ target: clickPos })
    }, [clickPos])

    return null
}

const Dummies = () => {
    const dummies = useDummiesState()
    return (
        <>
            {
                dummies.map((d, i) => (
                    <Dummy
                        key={i}

                        id={d.id}
                        pos={d.pos}
                        target={d.target}
                        type={d.type}
                        isSelected={d.isSelected}
                    />
                ))
            }
        </>
    )
}

const Game = ({
    setView = () => {},
}) => {
    // get the actual viewport instance
    const viewportRef = useRef()

    const [width, height] = useResize()

    const stageOptions = {
        antialias: true,
        autoDensity: true,
        backgroundColor: 0x999999,
    }

    return (
        <>
            <div style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                display: 'flex',
                gap: '10px',
            }}
            >
                <button
                    onClick={() => setView(VIEW.TITLE_SCREEN)}
                    style={{
                        border: 'none',
                        fontSize: '70%',
                        padding: '0.5rem 0.8rem',
                        background: '#efefef',
                        boxShadow: '3px 3px 0 #ccc',
                    }}
                >{'<<<<<'}</button>
            </div>

            <Stage width={width} height={height} options={stageOptions}>
                <Viewport
                    ref={viewportRef}

                    width={width}
                    height={height}
                >
                    <ClickManager />
                    <Background />
                    <DummySpawner {...SPWANERS.BLUE} />
                    <DummySpawner {...SPWANERS.GREEN} />
                    <DummySpawner {...SPWANERS.YELLOW} />
                    {/* {SPWANERS.ALIENS.map((spawner) => (
                        <Spawner {...spawner} />
                    ))} */}
                    <Dummies />
                    <Player />
                    {/* <Foreground /> */}

                    {/* <GridBuilder /> */}
                </Viewport>
            </Stage>
        </>
    )
}

Game.propTypes = {
    setView: PropTypes.func,
}

export default Game