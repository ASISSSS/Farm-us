import { GRID } from '../AppConstant'

const posToGrid = (pos) => {
    return {
        x: Math.floor(pos.x / GRID.CELL_SIZE),
        y: Math.floor(pos.y / GRID.CELL_SIZE),
    }
}

const gridToPos = (gridPos) => {
    return {
        x: gridPos.x * GRID.CELL_SIZE + (GRID.CELL_SIZE / 2),
        y: gridPos.y * GRID.CELL_SIZE + (GRID.CELL_SIZE / 2),
    }
}

const cleanPath = (path = []) => {
    if (path.length <= 1) return path
    let newPath = []
    let dir = {
        x: path[1].x - path[0].x,
        y: path[1].y - path[0].y,
    }
    path.forEach((p, i) => {
        if (i === path.length - 1) {
            newPath.push(p)
            return
        }

        let next = path[i + 1]
        let tmpDir = { x: next.x - p.x, y: next.y - p.y }
        if (dir.x !== tmpDir.x || dir.y !== tmpDir.y) {
            dir = tmpDir
            newPath.push(p)
        }
    })
    return newPath
}

const formatPath = (path = []) => {
    const formatted = path.map(p => gridToPos(p))
    return cleanPath(formatted)
}

export {
    posToGrid,
    gridToPos,
    formatPath,
    cleanPath,
}