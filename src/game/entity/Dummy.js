import { Sprite, useTick } from '@pixi/react'
import React, { useState } from 'react'
import useIteration from '../../hooks/useIteration'
import { ENTITY, PLAYER, WORLD_SIZE } from '../../AppConstant'

const Dummy = (props) => {
    const { images, x, y } = props

    const iter = useIteration(0.1)

    const [pos, setPos] = useState({ x, y })

    const [image, setImage] = useState(images[0])
    const [isChangeImage, setIsChangeImage] = useState(false)
    const [frame, setFrame] = useState(ENTITY.CHANGE_IMAGE_FRAME - 1)
    const [imageIndex, setIndex] = useState(0)

    const updateImage = () => {
        if (isChangeImage === true) {
            const newIndex = (imageIndex + 1) % images.length
            setIndex(newIndex)
            const nextImage = images[newIndex]
            setImage(nextImage)
            setIsChangeImage(false)
            setFrame(0)
        }
    }

    useTick((delta) => {
        const i = (iter + 0.05 * delta)
        setPos(prev => {
            const newX = Math.sin(i) * 2
            const newY = Math.sin(i / 1.5) * 2

            const newFrame = frame + 1
            setFrame(newFrame)

            if ((newFrame % ENTITY.CHANGE_IMAGE_FRAME) === 0) {
                setIsChangeImage(true)
            }
            updateImage()
            return {
                x: pos.x + newX,
                y: pos.y + newY
            }
        })
    })


    return (
        <>
            <Sprite
                image={ image }
                anchor={ 0.5 }
                scale={ 2 }
                x={ pos.x }
                y={ pos.y }
            />
        </>
    )
}

export default Dummy