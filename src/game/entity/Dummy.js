import { Sprite, useTick } from '@pixi/react'
import React, { useState } from 'react'
import useIteration from '../../hooks/useIteration'
import { ENTITY, PLAYER } from '../../AppConstant'
import { posToGrid } from '../../utils/GridUtil'

const Dummy = (props) => {
    const { images, x, y } = props

    const [pos, setPos] = useState({ x, y })

    const [image, setImage] = useState(images[0])
    const [isChangeImage, setIsChangeImage] = useState(false)
    const [frame, setFrame] = useState(ENTITY.CHANGE_IMAGE_FRAME - 1)
    const [imageIndex, setIndex] = useState(0)
    const [path, setPath] = useState([])

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

    })


    return (
        <Sprite
            image={ image }
            anchor={ 0.5 }
            scale={ 0.2 }
            {...pos}
        />
    )
}

export default Dummy