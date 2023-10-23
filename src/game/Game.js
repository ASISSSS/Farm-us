import React, { forwardRef, useEffect, useRef } from 'react'
import { Stage, PixiComponent, useApp } from '@pixi/react'
import useResize from '../hooks/useResize'
import { CAMERA, PLAYER, SPWANERS, VIEW, WORLD_SIZE } from '../AppConstant'
import { Viewport as PixiViewport } from 'pixi-viewport'
import { EventSystem } from 'pixi.js'
import PropTypes from 'prop-types'
import Background from './map/Background'
import { Player, Spawner } from './entity'
import GridBuilder from './map/GridBuilder'

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
        // viewport.snapZoom({ width: props.width / 5, height: props.height / 5 })
        // viewport.snapZoom({ width: props.width, height: props.height })
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
        />
    )
})

const Game = ({
    setView = () => {},
}) => {
    // get the actual viewport instance
    const viewportRef = useRef()

    // get ref of the bunny to follow
    const playerRef = useRef()

    const clickPos = useRef()

    const [width, height] = useResize()

    const stageOptions = {
        antialias: true,
        autoDensity: true,
        backgroundColor: 0x999999,
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         const viewport = viewportRef.current

    //         viewport.follow(playerRef.current, { speed: CAMERA.SPEED })
    //     }, 500)
    // }, [])

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
                    pointerdown={(e) => {
                        clickPos.current = viewportRef.current.toWorld(e.data.global.x, e.data.global.y)
                        console.log(clickPos.current)
                    }}
                >
                    <Background />
                    <Spawner {...SPWANERS.BLUE}/>
                    <Spawner {...SPWANERS.GREEN}/>
                    <Spawner {...SPWANERS.YELLOW}/>
                    {/* <GridBuilder clickPos={clickPos} /> */}
                    <Spawner {...SPWANERS.ALIENS}/>
                    <Player x={PLAYER.POSITION_START_X} y={PLAYER.POSITION_START_Y} target={clickPos} ref={playerRef} />

                </Viewport>
            </Stage>
        </>
    )
}

Game.propTypes = {
    setView: PropTypes.func,
}

export default Game