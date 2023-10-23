import React from 'react'
import { Sprite } from '@pixi/react'
import map from '../../assets/map.png'
import { WORLD_SIZE } from '../../AppConstant'

const Background = () => {
    return (
        <>
            <Sprite
                image={map}
                anchor={0}
                width={WORLD_SIZE.WIDTH}
                height={WORLD_SIZE.HEIGHT}
                x={0}
                y={0}
            />
        </>
    )
}

export default Background