import { Sprite, useTick } from '@pixi/react'
import React, { useRef, useState } from 'react'

const Dummy = (props) => {
    const { image, x, y } = props

    const iter = useRef(0)
    const [posX, setX] = useState(x)
    const [posY, setY] = useState(y)

    useTick((delta) => {
        const i = (iter.current += 0.05 * delta)

        const newX = Math.sin(i) * 100
        const newY = Math.sin(i / 1.5) * 100

        setX(posX + newX)
        setY(posY + newY)
    })


    return (
        <>
            <Sprite
                image={ image }
                anchor={ 0.5 }
                scale={ 1 }
                x={ x }
                y={ y }
            />
        </>
    )
}

export default Dummy