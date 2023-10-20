import { Sprite } from '@pixi/react'
import React, { forwardRef } from 'react'

const Player = forwardRef((props, ref) => {
    return (
        <Sprite
            ref={ref}
            image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
            anchor={0.5}
            scale={3}
            eventMode="dynamic"
            {...props}
            cursor="pointer"
            pointerdown={e => console.log('onPointerDown', e)}
        />
    )
})

export default Player