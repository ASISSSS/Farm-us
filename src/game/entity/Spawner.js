import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Sprite, Text } from '@pixi/react'
import { green, blue, yellow, aliens, blue1, green1, yellow1, dirt, blue2, green2, yellow2 } from '../../assets'
import { DUMMIES_TYPES } from '../../AppConstant'
import Dummy from './Dummy'
import { TextStyle } from 'pixi.js'

const Spawner = forwardRef((props, ref) => {
    const { x, y, timer, type, maxSpawn } = props
    const BASE_SCALE = 3
    const timerRef = useRef()
    const [displayDirtTrickY, setDisplayDirtTrick] = useState(BASE_SCALE)
    const [spwanned, setSpwaned] = useState([])

    const getImages = () => {
        switch (type) {
            case DUMMIES_TYPES.BLUE:
                return [blue, [blue1, blue2]]
            case DUMMIES_TYPES.GREEN:
                return [green, [green1, green2]]
            case DUMMIES_TYPES.YELLOW:
                return [yellow, [yellow1, yellow2]]
            default:
                return [aliens, [aliens, aliens]]
        }
    }

    const [image, [amongUsImage, ...otherImages]] = getImages()

    useEffect(() => {
        if (spwanned.length < maxSpawn) {
            timerRef.current = setTimeout(() => {
                setDisplayDirtTrick((prevState) => {
                    if (prevState === 0) return BASE_SCALE
                    setSpwaned([...spwanned, { x, y, images: [amongUsImage, ...otherImages] }])
                    return 0
                })
            }, timer)
            if (displayDirtTrickY === 0) {
                setDisplayDirtTrick(BASE_SCALE)
            }
        } else {
            setSpwaned([...spwanned.slice(0, maxSpawn)])
            setDisplayDirtTrick(BASE_SCALE)
        }
        return () => clearTimeout(timerRef.current)
    }, [displayDirtTrickY, amongUsImage, maxSpawn, timer, x, y])


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
            <Text
                text={ `Limit: ${maxSpawn}` }
                x={ x - 115 }
                y={ y - 115 }
                style={
                    new TextStyle({
                        align: 'center',
                        fontSize: 30,
                        fill: '#ffffff', // gradient
                        letterSpacing: 5,
                        wordWrap: true,
                        wordWrapWidth: 440,
                    })
                }
            />
            <Sprite
                ref={ ref }
                image={ amongUsImage }
                anchor={ 0.5 }
                scale={ 1 }
                x={ x }
                y={ y }
            />
            <Sprite
                ref={ ref }
                image={ dirt }
                anchor={ 0.5 }
                scale={ { x: 4, y: displayDirtTrickY } }
                x={ x }
                y={ y }
            />

            { spwanned.map((dummyProps) => (
                <Dummy { ...dummyProps }/>
            )) }
        </>
    )
})

export default Spawner