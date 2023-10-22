import { Graphics, Sprite, useTick } from '@pixi/react'
import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { player1, player2 } from '../../assets'
import { GRID, PLAYER, WORLD_SIZE } from '../../AppConstant'
import { getAStarInstance } from '../../utils/pathfinding/AStart'
import { posToGrid } from '../../utils/Grid'


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
    const [frame, setFrame] = useState(PLAYER.CHANGE_IMAGE_FRAME - 1)
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

        // setPos({ x: target.current.x, y: target.current.y })
        if (target.current.x !== targetPos.x || target.current.y !== targetPos.y) setTargetPos({ ...target.current })

        setPos(prev => {
            const distX = target.current.x - prev.x
            const distY = target.current.y - prev.y

            const mag = Math.sqrt(distX * distX + distY * distY)
            const distNormalize = {
                x: distX / mag,
                y: distY / mag,
            }

            const moveX = distNormalize.x * delta * PLAYER.SPEED
            const moveY = distNormalize.y * delta * PLAYER.SPEED

            // const newFrame = frame + 1
            // setFrame(newFrame)

            // if ((newFrame % PLAYER.CHANGE_IMAGE_FRAME) === 0) {
            //     setIsChangeImage(true)
            // }

            updateImage()
            if (Math.abs(moveX) >= Math.abs(distX) && Math.abs(moveY) >= Math.abs(distY)) {
                target.current = undefined
                return { x: prev.x + distX, y: prev.y + distY }
                // return {
                //     x: Math.min(Math.max(0, prev.x + distX), WORLD_SIZE.WIDTH),
                //     y: Math.min(Math.max(0, prev.y + distY), WORLD_SIZE.HEIGHT),
                // }
            }
            return { x: prev.x + moveX, y: prev.y + moveY }
            // return {
            //     x: Math.min(Math.max(0, prev.x + moveX), WORLD_SIZE.WIDTH),
            //     y: Math.min(Math.max(0, prev.y + moveY), WORLD_SIZE.HEIGHT)
            // }
        })
    })

    useEffect(() => {
        const aStar = getAStarInstance()
        const start = posToGrid([pos.x, pos.y])
        const end = posToGrid([targetPos.x, targetPos.y])
        setPath(aStar.search(start, end))
    }, [targetPos])

    // playerRef.current.x = Math.min(Math.max(0, x), WORLD_SIZE.WIDTH)
    // playerRef.current.y = Math.min(Math.max(0, y), WORLD_SIZE.HEIGHT)

    const draw = useCallback(g => {
        g.clear()
        if (!target.current) return
        g.beginFill(0x006eff)
        const start = posToGrid([pos.x, pos.y])
        g.drawCircle(start.x * GRID.CELL_SIZE + (GRID.CELL_SIZE / 2), start.y * GRID.CELL_SIZE + (GRID.CELL_SIZE / 2), GRID.CELL_SIZE / 2)
        path.forEach(node => {
            g.drawCircle(node.x * GRID.CELL_SIZE + (GRID.CELL_SIZE / 2), node.y * GRID.CELL_SIZE + (GRID.CELL_SIZE / 2), GRID.CELL_SIZE / 2)
        })
        g.endFill()
    }, [pos])

    return (
        <>
            <Sprite
                ref={ref}
                image={image}
                anchor={0.5}
                scale={0.3}
                x={pos.x}
                y={pos.y}
            />
            <Graphics draw={draw} />
        </>
    )
})

export default Player