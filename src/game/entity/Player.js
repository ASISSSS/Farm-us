import { AnimatedSprite, Container, Graphics, useTick } from '@pixi/react'
import React, { useCallback, useEffect, useRef } from 'react'
import { player1, player2 } from '../../assets'
import { GRID, PLAYER } from '../../AppConstant'
import aStar from '../../utils/pathfinding/AStart'
import { formatPath } from '../../utils/GridUtil'
import usePlayerState, { playerAction } from '../../hooks/gameState/usePlayerState'

const image = [player1, player2]

const Player = () => {
    const { pos, target } = usePlayerState()
    const path = useRef([]) // opti

    useEffect(() => {
        const newPath = formatPath(aStar.search(pos, target))
        path.current = newPath
    }, [target])

    useTick(delta => {
        if (!path.current.length) return

        const firstPath = path.current[0]

        const distX = firstPath.x - pos.x
        const distY = firstPath.y - pos.y

        const mag = Math.sqrt(distX * distX + distY * distY)
        const distNormalize = {
            x: distX / mag,
            y: distY / mag,
        }

        const moveX = distNormalize.x * delta * PLAYER.SPEED
        const moveY = distNormalize.y * delta * PLAYER.SPEED

        if (Math.abs(moveX) >= Math.abs(distX) && Math.abs(moveY) >= Math.abs(distY)) {
            path.current = path.current.slice(1)
            playerAction.setPlayer({ pos: { x: firstPath.x, y: firstPath.y } })
            return
        }
        playerAction.setPlayer({ pos: { x: pos.x + moveX, y: pos.y + moveY } })
    })

    const draw = useCallback(g => {
        g.clear()
        if (!path.current.length) return
        g.beginFill(0x006eff)
        g.drawCircle(target.x, target.y, GRID.CELL_SIZE)
        g.endFill()
    }, [target, pos])

    return (
        <>
            <Graphics draw={draw} />
            <Container position={[pos.x, pos.y - 3 * GRID.CELL_SIZE]}>
                <AnimatedSprite
                    anchor={0.5}
                    images={image}
                    isPlaying={path.current.length}
                    initialFrame={0}
                    scale={0.3}
                    animationSpeed={0.2}
                />
            </Container>
        </>
    )
}

export default Player