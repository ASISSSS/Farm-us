import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Graphics, Sprite, useTick } from '@pixi/react'
import { WORLD_SIZE } from '../../AppConstant'
import jsonGrid from '../../assets/grid.json'

const CELL_SIZE = 10
const LINE_WIDTH = 0.3

const GridBuilder = ({
    clickPos,
}) => {
    const [grid, setGrid] = useState(() => {
        if (jsonGrid?.grid) return jsonGrid.grid

        const nbVert = Math.round(WORLD_SIZE.WIDTH / CELL_SIZE)
        const nbHori = Math.round(WORLD_SIZE.HEIGHT / CELL_SIZE)

        let defaultGrid = new Array(nbHori)
        for (let i = 0; i < nbHori; i++) {
            defaultGrid[i] = new Array(nbVert)
            for (let j = 0; j < nbVert; j++) {
                defaultGrid[i][j] = 0
            }
        }
        return defaultGrid
    })

    const [isEditing, setEditing] = useState(false)

    const [pos, setPos] = useState({ x: 0, y: 0 })
    useTick(delta => {
        if (!clickPos.current) return

        if (clickPos.current.x !== pos.x || clickPos.current.y !== pos.y) {
            setPos({ x: clickPos.current.x, y: clickPos.current.y })
            if (isEditing) {
                setGrid(p => {
                    const nbVert = Math.round(WORLD_SIZE.WIDTH / CELL_SIZE)

                    const colIndex = Math.floor(clickPos.current.x / CELL_SIZE)
                    const rowIndex = Math.floor(clickPos.current.y / CELL_SIZE)
                    const newRow = [
                        ...p[rowIndex].slice(0, colIndex),
                        p[rowIndex][colIndex] === 1 ? 0 : 1,
                        ...p[rowIndex].slice(colIndex + 1),
                    ]
                    return [
                        ...p.slice(0, rowIndex),
                        newRow,
                        ...p.slice(rowIndex + 1),
                    ]
                })
            }
        }
    })

    const draw = useCallback(g => {
        g.clear()
        g.lineStyle(LINE_WIDTH, 0xff0000)

        const nbVert = grid[0]?.length ?? 0
        for (let i = 0; i < nbVert; i++) {
            g.moveTo(i * CELL_SIZE, 0)
            g.lineTo(i * CELL_SIZE, WORLD_SIZE.HEIGHT)
        }


        const nbHori = grid.length
        for (let i = 0; i < nbHori; i++) {
            g.moveTo(0, i * CELL_SIZE)
            g.lineTo(WORLD_SIZE.WIDTH, i * CELL_SIZE)
        }

        for (let i = 0; i < nbHori; i++) {
            for (let j = 0; j < nbVert; j++) {
                g.beginFill(0xff0000)
                if (grid[i][j] === 1) g.drawCircle(j * CELL_SIZE + (CELL_SIZE / 2), i * CELL_SIZE + (CELL_SIZE / 2), CELL_SIZE / 2)
            }
        }
        g.endFill()
    }, [grid])
    return (
        <>
            <Graphics draw={draw} />
            <Sprite
                image={isEditing ? 'https://cdn.iconscout.com/icon/free/png-256/free-delete-4095676-3389247.png' : 'https://cdn1.iconfinder.com/data/icons/design-estate/66/tick-circle-confirm-correct-validate-512.png'}
                anchor={0.1}
                scale={isEditing ? 0.13 : 0.06}
                x={pos.x - 50}
                y={pos.y - 50}
                interactive
                pointerdown={(e) => {
                    e.stopPropagation()
                    setEditing(p => !p)
                }}
            />
            {
                !isEditing && (
                    <Sprite
                        image="https://cdn.iconscout.com/icon/free/png-256/free-save-1779882-1518534.png"
                        anchor={0.5}
                        scale={0.13}
                        x={pos.x + 50}
                        y={pos.y - 50}
                        interactive
                        pointerdown={() => {
                            let dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify({ grid }))}`
                            let downloadAnchorNode = document.createElement('a')
                            downloadAnchorNode.setAttribute('href', dataStr)
                            downloadAnchorNode.setAttribute('download', 'grid.json')
                            downloadAnchorNode.click()
                        }}
                    />
                )
            }
        </>
    )
}

export default GridBuilder