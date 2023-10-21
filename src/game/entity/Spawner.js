import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Sprite } from '@pixi/react'
import { green, blue, yellow, aliens, blue1, green1, yellow1, dirt } from '../../assets'
import { DUMMIES_TYPES } from '../../AppConstant'

const Spawner = forwardRef((props, ref) => {
    const { x, y, timer, type } = props
    const BASE_SCALE = 3
    const timerRef = useRef()
    const [displayDirtTrickY, setDisplayDirtTrick] = useState(BASE_SCALE)

    const getImage = () => {
        switch (type) {
            case DUMMIES_TYPES.BLUE:
                return [blue, blue1]
            case DUMMIES_TYPES.GREEN:
                return [green, green1]
            case DUMMIES_TYPES.YELLOW:
                return [yellow, yellow1]
            default:
                return aliens
        }
    }

    const [image, amongUsImage] = getImage()

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setDisplayDirtTrick((prevState) => {
                if (prevState === 0) return BASE_SCALE
                return 0
            })
        }, timer)
        return () => clearTimeout(timerRef.current)
    }, [displayDirtTrickY])


    return (
        <>
            <Sprite
                ref={ ref }
                image={ image }
                anchor={ 0.5 }
                scale={ 10 }
                x={ x }
                y={ y }
            />
            <Sprite
                ref={ ref }
                image={ amongUsImage }
                anchor={ 0.5 }
                scale={ 1 }
                x={ x }
                y={ y + 20 }
            />
            <Sprite
                ref={ ref }
                image={ dirt }
                anchor={ 0.5 }
                scale={ { x: 4, y: displayDirtTrickY } }
                x={ x }
                y={ y + 20 }
            />
        </>
    )
})

export default Spawner