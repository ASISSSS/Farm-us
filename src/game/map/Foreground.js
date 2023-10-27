import { Sprite } from '@pixi/react'
import { foreground } from '../../assets'
import { WORLD_SIZE } from '../../AppConstant'
import React from 'react'

const Foreground = () => (
    <>
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