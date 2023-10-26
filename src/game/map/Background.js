import React from 'react'
import { Sprite } from '@pixi/react'
import map from '../../assets/map.png'
import { WORLD_SIZE } from '../../AppConstant'
import {
    security,
    window,
    windowBreak,
    windowTesla,
    windowSetAway,
    windowNyanCat,
    engine,
    cafetTable
} from '../../assets'

const Background = () => {
    return (
        <>
            <Sprite
                image={ map }
                anchor={ 0 }
                width={ WORLD_SIZE.WIDTH }
                height={ WORLD_SIZE.HEIGHT }
                x={ 0 }
                y={ 0 }
            />
            <Sprite
                image={ security }
                anchor={ 0 }
                scale={ 0.294 }
                x={ 302 }
                y={ 264 }
            />
            <Sprite
                image={ window }
                anchor={ 0 }
                scale={ 0.5 }
                x={ 406 }
                y={ 72 }
            />
            <Sprite
                image={ window }
                anchor={ 0 }
                scale={ 0.5 }
                x={ 450 }
                y={ 72 }
            />
            <Sprite
                image={ windowSetAway }
                anchor={ 0 }
                scale={ 0.5 }
                x={ 494 }
                y={ 72 }
            />
            <Sprite
                image={ window }
                anchor={ 0 }
                scale={ 0.5 }
                x={ 538 }
                y={ 72 }
            />
            <Sprite
                image={ window }
                anchor={ 0 }
                scale={ 0.5 }
                x={ 582 }
                y={ 72 }
            />
            <Sprite
                image={ windowTesla }
                anchor={ 0 }
                scale={ 0.5 }
                x={ 626 }
                y={ 72 }
            />
            <Sprite
                image={ window }
                anchor={ 0 }
                scale={ 0.5 }
                x={ 820 }
                y={ 121 }
            />
            <Sprite
                image={ window }
                anchor={ 0 }
                scale={ 0.5 }
                x={ 864 }
                y={ 121 }
            />
            <Sprite
                image={ windowBreak }
                anchor={ 0 }
                scale={ 0.5 }
                x={ 908 }
                y={ 121 }
            />
            <Sprite
                image={ windowNyanCat }
                anchor={ 0 }
                scale={ 0.5 }
                x={ 952 }
                y={ 121 }
            />

            <Sprite
                image={ cafetTable }
                anchor={ 0.5 }
                scale={ 0.4 }
                x={ 549 }
                y={ 168 }
            />
            <Sprite
                image={ cafetTable }
                anchor={ 0.5 }
                scale={ 0.4 }
                x={ 700 }
                y={ 168 }
            />
            <Sprite
                image={ cafetTable }
                anchor={ 0.5 }
                scale={ 0.4 }
                x={ 625 }
                y={ 278 }
            />

            <Sprite
                image={ engine }
                anchor={ 0 }
                scale={ 0.294 }
                x={ 189 }
                y={ 467.5 }
            />
            <Sprite
                image={ engine }
                anchor={ 0 }
                scale={ 0.294 }
                x={ 189 }
                y={ 185 }
            />
        </>
    )
}

export default Background