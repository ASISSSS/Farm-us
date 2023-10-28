import { AnimatedSprite, Container, Graphics, useTick } from '@pixi/react'
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { DUMMIES_TYPES, GRID, PLAYER } from '../../AppConstant'
import { formatPath } from '../../utils/GridUtil'
import { blue1, blue2, green1, green2, yellow1, yellow2 } from '../../assets'
import { dummiesAction } from '../../hooks/gameState/useDummiesState'
import aStar from '../../utils/pathfinding/AStart'

const Dummy = ({
    id,
    pos,
    type,
    target,
    isSelected,
}) => {
    const path = useRef([]) // opti
    const orientation = useRef(1)

    useEffect(() => {
        const newPath = formatPath(aStar.search(pos, target))
        path.current = newPath
    }, [target])

    const images = useMemo(() => {
        switch (type) {
            case DUMMIES_TYPES.BLUE: return [blue1, blue2]
            case DUMMIES_TYPES.GREEN: return [green1, green2]
            case DUMMIES_TYPES.YELLOW: return [yellow1, yellow2]
            default: return [blue1, blue2]
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

        const moveX = distNormalize.x * delta * PLAYER.SPEED
        const moveY = distNormalize.y * delta * PLAYER.SPEED

        orientation.current = moveX < 0 && -1 || moveX > 0 && 1 || orientation.current

        if (Math.abs(moveX) >= Math.abs(distX) && Math.abs(moveY) >= Math.abs(distY)) {
            path.current = path.current.slice(1)
            dummiesAction.update(id, { pos: { x: firstPath.x, y: firstPath.y } })
            return
        }
        dummiesAction.update(id, { pos: { x: pos.x + moveX, y: pos.y + moveY } })
    })

    const draw = useCallback(g => {
        g.clear()
        if (isSelected) {
            g.beginFill(0x69ffaa, 0.5)
            g.drawEllipse(pos.x, pos.y + 5, 8, 3)
        }
        if (!path.current.length) return
        g.beginFill(0xffff9c)
        g.drawCircle(target.x, target.y, GRID.CELL_SIZE)
        g.endFill()
    }, [target, pos, isSelected])

    return (
        <>
            <Graphics draw={draw} />
            <Container position={[pos.x, pos.y]}>
                <AnimatedSprite
                    anchor={0.5}
                    images={images}
                    isPlaying={!!path.current.length}
                    initialFrame={0}
                    scale={{ x: orientation.current * 0.3, y: 0.3 }}
                    animationSpeed={0.2}

                    eventMode="static"
                    pointerdown={(e) => {
                        e.stopPropagation()
                        dummiesAction.update(id, { isSelected: !isSelected })
                    }}
                />
            </Container>
        </>
    )
}

export default memo(Dummy)