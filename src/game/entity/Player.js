import { Graphics, Sprite, useTick } from '@pixi/react'
import React, { forwardRef, useCallback, useState } from 'react'

const SPEED = 15

const Player = forwardRef((props, ref) => {
    const {
        x,
        y,
        target,
    } = props
    const [pos, setPos] = useState({ x, y })

    useTick(delta => {
        if (!target.current) return

        setPos(prev => {
            const distX = target.current.x - prev.x
            const distY = target.current.y - prev.y

            const mag = Math.sqrt(distX * distX + distY * distY)
            const distNormalize = {
                x: distX / mag,
                y: distY / mag,
            }

            const moveX = distNormalize.x * delta * SPEED
            const moveY = distNormalize.y * delta * SPEED

            if (Math.abs(moveX) >= Math.abs(distX) && Math.abs(moveY) >= Math.abs(distY)) {
                target.current = undefined
                return { x: prev.x + distX, y: prev.y + distY }
            }

            return { x: prev.x + moveX, y: prev.y + moveY }
        })
    })

    // playerRef.current.x = Math.min(Math.max(0, x), WORLD_SIZE.WIDTH)
    // playerRef.current.y = Math.min(Math.max(0, y), WORLD_SIZE.HEIGHT)

    const draw = useCallback(g => {
        g.clear()
        if (!target.current) return
        g.beginFill(0x006eff)
        g.drawCircle(target.current.x, target.current.y, 10)
        g.endFill()
    }, [pos])

    return (
        <>
            <Graphics draw={draw} />
            <Sprite
                ref={ref}
                image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
                anchor={0.5}
                scale={5}
                x={pos.x}
                y={pos.y}
            />
        </>
    )
})

export default Player