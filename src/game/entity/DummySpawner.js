import { Sprite, Text, useTick } from '@pixi/react'
import { TextStyle } from 'pixi.js'
import React, { useMemo, useState } from 'react'
import { blue, blue1, dirt, green, green1, yellow, yellow1 } from '../../assets'
import { DUMMIES_TYPES } from '../../AppConstant'
import useDummiesState, { dummiesAction } from '../../hooks/gameState/useDummiesState'

const START_DIRT_OFFSET = 4
const MAX_DIRT_OFFSET = -2

const DummySpawner = ({
    x,
    y,
    type,
    timer,
    maxSpawn = 1,
}) => {
    const [dirtOffset, setDirtOffset] = useState(START_DIRT_OFFSET)
    const dummies = useDummiesState()

    const dummyImage = useMemo(() => {
        switch (type) {
            case DUMMIES_TYPES.BLUE: return blue1
            case DUMMIES_TYPES.GREEN: return green1
            case DUMMIES_TYPES.YELLOW: return yellow1
            default: return blue1 // todo default image
        }
    }, [type])

    const spawnerImage = useMemo(() => {
        switch (type) {
            case DUMMIES_TYPES.BLUE: return blue
            case DUMMIES_TYPES.GREEN: return green
            case DUMMIES_TYPES.YELLOW: return yellow
            default: return blue // todo default image
        }
    }, [type])

    const nbDummy = useMemo(() => {
        return dummies.filter(d => d.type === type).length
    }, [dummies, type])

    useTick(delta => {
        if (nbDummy >= maxSpawn) return

        if (dirtOffset > MAX_DIRT_OFFSET) {
            setDirtOffset(prev => prev - delta / timer)
            return
        }

        setDirtOffset(START_DIRT_OFFSET)
        dummiesAction.add({
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
                image={dummyImage}
                anchor={0.5}
                scale={0.18}
                x={x}
                y={y + dirtOffset}
            />
            <Sprite
                image={dirt}
                anchor={0.5}
                scale={{ x: 0.5, y: 0.25 }}
                x={x}
                y={y + 4.45}
            />
        </>
    )
}

export default DummySpawner