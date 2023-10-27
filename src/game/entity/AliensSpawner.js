import { Sprite, Text, useTick } from '@pixi/react'
import { TextStyle } from 'pixi.js'
import React, { useMemo, useState } from 'react'
import { aliens, aliens1, blue, blue1, dirt, green, green1, superAliens, yellow, yellow1 } from '../../assets'
import { ALIENS_TYPES, DUMMIES_TYPES, SPWANERS as ALIENS_TYYPE } from '../../AppConstant'
import useAliensState, { aliensAction } from '../../hooks/gameState/useAliensState'

const START_DIRT_OFFSET = 4
const MAX_DIRT_OFFSET = -2

const AlienSpwanner = ({
    x,
    y,
    type,
    timer,
    maxSpawn = 1,
}) => {
    const [dirtOffset, setDirtOffset] = useState(START_DIRT_OFFSET)
    const aliensStates = useAliensState()

    const alienImage = useMemo(() => {
        switch (type) {
            case ALIENS_TYPES.ALIENS: return aliens1
            case ALIENS_TYPES.ARALIENS: return superAliens
            default: return aliens1 // todo default image
        }
    }, [type])

    const spawnerImage = useMemo(() => {
        return aliens
    }, [type])

    const nbAliens = useMemo(() => {
        return aliensStates.filter(d => d.type === type).length
    }, [aliensStates, type])

    useTick(delta => {
        if (nbAliens >= maxSpawn) return

        if (dirtOffset > MAX_DIRT_OFFSET) {
            setDirtOffset(prev => prev - delta / timer)
            return
        }

        setDirtOffset(START_DIRT_OFFSET)
        aliensAction.add({
            pos: { x, y },
            target: { x: x + 20, y },
            type,
        })
    })

    return (
        <>
            <Sprite
                image={spawnerImage}
                anchor={0.5}
                scale={0.6}
                x={x}
                y={y}
            />
            <Text
                text={`Limit: ${maxSpawn}`}
                x={x - 10}
                y={y + 10}
                scale={0.1}
                style={
                    new TextStyle({
                        align: 'center',
                        fontSize: 40,
                        fill: '#000000',
                        letterSpacing: 5,
                        wordWrap: true,
                        wordWrapWidth: 440,
                    })
                }
            />
            <Sprite
                image={alienImage}
                anchor={0.5}
                scale={0.18}
                x={x}
                y={y + dirtOffset}
            />
        </>
    )
}

export default AlienSpwanner