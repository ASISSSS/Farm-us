import React from 'react'
import { Sprite } from '@pixi/react'
import map from '../../assets/map.png'
import { POSITION, WORLD_SIZE } from '../../AppConstant'
import {
    security,
    window,
    windowBreak,
    windowTesla,
    windowSetAway,
    windowNyanCat,
    engine,
    cafetTable, bedReversed, bed, cargoTrash, postNav, nuclearWaste, O2, adminDesk
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
            { POSITION.BED.REVERSED.map((reversedProps, index) => (
                <Sprite
                    key={index}
                    image={ bedReversed }
                    scale={ POSITION.BED.SCALE }
                    { ...reversedProps }
                />
            )) }
            { POSITION.BED.NORMAL.map((reversedProps, index) => (
                <Sprite
                    key={index}
                    image={ bed }
                    scale={ POSITION.BED.SCALE }
                    { ...reversedProps }
                />
            )) }
            <Sprite
                image={ cargoTrash }
                { ...POSITION.TRASH }
            />
            <Sprite
                image={ postNav }
                { ...POSITION.NAVIGATION }
            />
            {
                POSITION.NUCLEARTRASH.POSITIONS.map((nuclearProps, index) => (
                    <Sprite
                        key={index}
                        image={ nuclearWaste }
                        scale={ POSITION.NUCLEARTRASH.SCALE }
                        { ...nuclearProps }
                    />))
            }
            {
                POSITION.O2.POSITIONS.map((o2Props, index) => (
                    <Sprite
                        key={index}
                        image={ O2 }
                        scale={ POSITION.O2.SCALE }
                        { ...o2Props }
                    />))
            }
            <Sprite
                image={ adminDesk }
                anchor={ 0 }
                { ...POSITION.ADMINDESK }
            />

            <Sprite
                image={ security }
                anchor={ 0 }
                scale={ 0.294 }
                x={ 296.25 }
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
                scale={ 0.3 }
                x={ 549 }
                y={ 168 }
            />
            <Sprite
                image={ cafetTable }
                anchor={ 0.5 }
                scale={ 0.3 }
                x={ 700 }
                y={ 168 }
            />
            <Sprite
                image={ cafetTable }
                anchor={ 0.5 }
                scale={ 0.3 }
                x={ 625 }
                y={ 278 }
            />

            <Sprite
                image={ engine }
                anchor={ 0 }
                scale={ 0.294 }
                x={ 183.5 }
                y={ 467.5 }
            />
            <Sprite
                image={ engine }
                anchor={ 0 }
                scale={ 0.294 }
                x={ 183.5 }
                y={ 185 }
            />
        </>
    )
}

export default Background