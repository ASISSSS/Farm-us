import React, { forwardRef } from 'react'
import { Sprite, Stage } from '@pixi/react'
import map from '../assets/map.png'

const Background = forwardRef((props, ref) => {
    const { width, height } = props

    return (
        <Sprite
            ref={ref}
            image={map}
            scale={4}
            anchor={0.5}
            width={width * 2}
            height={height * 2}
            x={width / 2}
            y={height / 2}
            {...props}
        />
    )
})
export default Background