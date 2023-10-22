import { Graphics, Sprite, useTick } from '@pixi/react'
import React, { forwardRef, useCallback, useState } from 'react'
import { player1, player2 } from '../../assets'
import { ENTITY, PLAYER, WORLD_SIZE } from '../../AppConstant'

const Player = forwardRef((props, ref) => {
    const {
        x,
        y,
        target,
    } = props
    const [pos, setPos] = useState({ x, y })

    const animationImages = [player1, player2]

    const [image, setImage] = useState(player1)
    const [isChangeImage, setIsChangeImage] = useState(false)
    const [frame, setFrame] = useState(ENTITY.CHANGE_IMAGE_FRAME - 1)
    const [imageIndex, setIndex] = useState(0)

    const updateImage = () => {
        if (isChangeImage === true) {
            const newIndex = (imageIndex + 1) % animationImages.length
            setIndex(newIndex)
            const nextImage = animationImages[newIndex]
            setImage(nextImage)
            setIsChangeImage(false)
            setFrame(0)
        }
    }

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

            const moveX = distNormalize.x * delta * PLAYER.SPEED
            const moveY = distNormalize.y * delta * PLAYER.SPEED

            const newFrame = frame + 1
            setFrame(newFrame)

            if ((newFrame % ENTITY.CHANGE_IMAGE_FRAME) === 0) {
                setIsChangeImage(true)
            }

            updateImage()
            if (Math.abs(moveX) >= Math.abs(distX) && Math.abs(moveY) >= Math.abs(distY)) {
                target.current = undefined
                return {
                    x: Math.min(Math.max(0, prev.x + distX), WORLD_SIZE.WIDTH),
                    y: Math.min(Math.max(0, prev.y + distY), WORLD_SIZE.HEIGHT),
                }
            }

            return {
                x: Math.min(Math.max(0, prev.x + moveX), WORLD_SIZE.WIDTH),
                y: Math.min(Math.max(0, prev.y + moveY), WORLD_SIZE.HEIGHT)
            }
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
            <Graphics draw={ draw }/>
            <Sprite
                ref={ ref }
                image={ image }
                anchor={ 0.5 }
                scale={ 1 }
                x={ pos.x }
                y={ pos.y }
            />
        </>
    )
})

export default Player