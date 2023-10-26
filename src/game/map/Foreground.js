import { Sprite } from '@pixi/react'
import { adminDesk, bed, bedReversed, cargoTrash, foreground, nuclearWaste, O2, postNav } from '../../assets'
import { POSITION, WORLD_SIZE } from '../../AppConstant'
import React from 'react'

const Foreground = () => (
    <>
        { POSITION.BED.REVERSED.map((reversedProps) => (
            <Sprite
                image={ bedReversed }
                scale={ POSITION.BED.SCALE }
                { ...reversedProps }
            />
        )) }
        { POSITION.BED.NORMAL.map((reversedProps) => (
            <Sprite
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
            POSITION.NUCLEARTRASH.POSITIONS.map((nuclearProps) => (
                <Sprite
                    image={ nuclearWaste }
                    scale={ POSITION.NUCLEARTRASH.SCALE }
                    { ...nuclearProps }
                />))
        }
        {
            POSITION.O2.POSITIONS.map((o2Props) => (
                <Sprite
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
            image={ foreground }
            anchor={ 0 }
            width={ WORLD_SIZE.WIDTH }
            height={ WORLD_SIZE.HEIGHT }
            x={ 0 }
            y={ 0 }
        />
    </>
)

export default Foreground