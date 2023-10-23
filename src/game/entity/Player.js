import { Graphics, Sprite, useTick } from '@pixi/react'
import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { player1, player2 } from '../../assets'
import { GRID, ENTITY, PLAYER } from '../../AppConstant'
import { getAStarInstance } from '../../utils/pathfinding/AStart'
import { formatPath, posToGrid } from '../../utils/GridUtil'


const Player = forwardRef((props, ref) => {
    const {
        x,
        y,
        target,
    } = props
    const [pos, setPos] = useState({ x, y })
    const [targetPos, setTargetPos] = useState({ x: 0, y: 0 })
    const [path, setPath] = useState([])

    const animationImages = [player1, player2]

    const [image, setImage] = useState(player1)
    const [isChangeImage, setIsChangeImage] = useState(false)
    const [frame, setFrame] = useState(ENTITY.CHANGE_IMAGE_FRAME - 1)
    const [imageIndex, setIndex] = useState(0)

    const updateImage = () => {
        if (isChangeImage === true) {
            const newIndex = (imageIndex + 1) % animationImages.length
            setIndex(newIndex)
            const nextImage = animationImages[newIndex]
            setImage(nextImage)
            setIsChangeImage(false)
            setFrame(0)
        }
    }

    useTick(delta => {
        if (!target.current) return

        if (target.current.x !== targetPos.x || target.current.y !== targetPos.y) setTargetPos({ ...target.current })
        if (path.length === 0) return

        setPos(prev => {
            const distX = path[0][0] - prev.x
            const distY = path[0][1] - prev.y

            const mag = Math.sqrt(distX * distX + distY * distY)
            const distNormalize = {
                x: distX / mag,
                y: distY / mag,
            }

            const moveX = distNormalize.x * delta * PLAYER.SPEED
            const moveY = distNormalize.y * delta * PLAYER.SPEED

            const newFrame = frame + 1
            setFrame(newFrame)

            if ((newFrame % ENTITY.CHANGE_IMAGE_FRAME) === 0) {
                setIsChangeImage(true)
            }

            updateImage()
            if (Math.abs(moveX) >= Math.abs(distX) && Math.abs(moveY) >= Math.abs(distY)) {
                setPath(prevPath => prevPath.slice(1))
                return { x: prev.x + distX, y: prev.y + distY }
            }
            return { x: prev.x + moveX, y: prev.y + moveY }
        })
    })

    useEffect(() => {
        const aStar = getAStarInstance()
        const start = posToGrid([pos.x, pos.y])
        const end = posToGrid([targetPos.x, targetPos.y])
        const newPath = formatPath(aStar.search(start, end))
        setPath(newPath)
    }, [targetPos])

    // const draw = useCallback(g => {
    //     g.clear()
    //     if (!target.current) return
    //     g.beginFill(0x006eff)
    //     const start = posToGrid([pos.x, pos.y])
    //     g.drawCircle(start.x * GRID.CELL_SIZE + (GRID.CELL_SIZE / 2), start.y * GRID.CELL_SIZE + (GRID.CELL_SIZE / 2), GRID.CELL_SIZE / 2)
    //     path.forEach(p => {
    //         g.drawCircle(p[0], p[1], GRID.CELL_SIZE / 2)
    //     })
    //     g.endFill()
    // }, [pos])

    return (
        <>
            <Sprite
                ref={ ref }
                image={ image }
                anchor={ 0.5 }
                scale={ 0.3 }
                x={ pos.x }
                y={ pos.y - 3 * GRID.CELL_SIZE }
            />
            {/* <Graphics draw={draw} /> */ }
        </>
    )
})

export default Player