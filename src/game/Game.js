import React, { forwardRef, useEffect, useRef } from 'react'
import { Stage, Container, Sprite, PixiComponent, useApp } from '@pixi/react'
import useResize from '../hooks/useResize'
import useIteration from '../hooks/useIteration'
import { VIEW } from '../AppConstant'
import { Viewport as PixiViewport } from 'pixi-viewport'
import { EventSystem } from 'pixi.js'
import PropTypes from 'prop-types'

const areas = {
    world: [1000, 1000, 2000, 2000],
    center: [1000, 1000, 400, 400],
    tl: [100, 100, 200, 200],
    tr: [1900, 100, 200, 200],
    bl: [100, 1900, 200, 200],
    br: [1900, 1900, 200, 200],
}


// Wiggling bunny
const Bunny = forwardRef((props, ref) => {
    // abstracted away, see settings>js
    const i = useIteration(0.1)
    return (
        <Sprite
            ref={ref}
            image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
            anchor={0.5}
            scale={2}
            rotation={Math.cos(i) * 0.98}
            {...props}
        />
    )
})

const BunniesContainer = ({ name, ...props }) => {
    const [x, y] = areas[name]

    return (
        <Container x={x} y={y} {...props}>
            <Bunny x={-50} y={-50} />
            <Bunny x={50} y={-50} />
            <Bunny x={-50} y={50} />
            <Bunny x={50} y={50} />
        </Container>
    )
}

const BunnyFollowingCircle = forwardRef(({ x, y, rad }, ref) => {
    const i = useIteration(0.02)
    return <Bunny ref={ref} x={x + Math.cos(i) * rad} y={y + Math.sin(i) * rad} scale={6} />
})

const PixiViewportComponent = PixiComponent('Viewport', {
    create: (props) => {
        const events = new EventSystem(props.app.renderer)
        events.domElement = props.app.renderer.view
        const viewport = new PixiViewport({
            screenWidth: props.width,
            screenHeight: props.height,
            worldWidth: props.width * 2,
            worldHeight: props.height * 2,
            ticker: props.app.ticker,
            interaction: props.app.renderer.plugins.interaction,
            events,
            passiveWheel: false,
        })
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
        <PixiViewportComponent ref={ref} app={app} {...props} />
    )
})

const Game = ({
    setView = () => {},
}) => {
    // get the actual viewport instance
    const viewportRef = useRef()

    // get ref of the bunny to follow
    const followBunny = useRef()

    const [width, height] = useResize()

    const stageOptions = {
        antialias: true,
        autoDensity: true,
        backgroundColor: 0x999999,
    }

    useEffect(() => {
        setTimeout(() => {
            const viewport = viewportRef.current

            viewport.snapZoom({ width: 1000, height: 1000 })
            viewport.follow(followBunny.current, { speed: 20 })
        }, 500)
    }, [])

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
                <Viewport width={width} height={height} ref={viewportRef} followBunny={followBunny}>
                    <BunniesContainer name="tl" />
                    <BunniesContainer name="tr" />
                    <BunniesContainer name="bl" />
                    <BunniesContainer name="br" />
                    <BunniesContainer name="center" scale={2} />

                    <BunnyFollowingCircle x={1000} y={1000} rad={500} ref={followBunny} />
                </Viewport>
            </Stage>
        </>
    )
}

Game.propTypes = {
    setView: PropTypes.func,
}

export default Game