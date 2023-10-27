import { AnimatedSprite, Container, Graphics, useTick } from '@pixi/react'
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { ALIENS, ALIENS_TYPES, DUMMIES_TYPES, GRID, PLAYER } from '../../AppConstant'
import { formatPath } from '../../utils/GridUtil'
import { aliens1, aliens2, superAliens, superAliens2, } from '../../assets'
import aStar from '../../utils/pathfinding/AStart'
import { aliensAction } from '../../hooks/gameState/useAliensState'

const Aliens = ({
    id,
    pos,
    type,
    target,
}) => {
    const path = useRef([]) // opti

    useEffect(() => {
        const newPath = formatPath(aStar.search(pos, target))
        path.current = newPath
    }, [target])

    const images = useMemo(() => {
        switch (type) {
            case ALIENS_TYPES.ALIENS: return [aliens1, aliens2]
            case ALIENS_TYPES.ARALIENS: return [superAliens, superAliens2]
            default: return [aliens1, aliens2]
        }
    }, [type])

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

        const moveX = distNormalize.x * delta * ALIENS.SPEED
        const moveY = distNormalize.y * delta * ALIENS.SPEED

        if (Math.abs(moveX) >= Math.abs(distX) && Math.abs(moveY) >= Math.abs(distY)) {
            path.current = path.current.slice(1)
            aliensAction.update(id, { pos: { x: firstPath.x, y: firstPath.y } })
            return
        }
        aliensAction.update(id, { pos: { x: pos.x + moveX, y: pos.y + moveY } })
    })

    return (
        <>
            <Container position={[pos.x, pos.y]}>
                <AnimatedSprite
                    anchor={0.5}
                    images={images}
                    isPlaying={!!path.current.length}
                    initialFrame={0}
                    scale={0.3}
                    animationSpeed={0.2}
                />
            </Container>
        </>
    )
}

export default memo(Aliens)