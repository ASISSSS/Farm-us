import { GRID } from '../AppConstant'

const posToGrid = (pos) => {
    return [
        Math.floor(pos[0] / GRID.CELL_SIZE),
        Math.floor(pos[1] / GRID.CELL_SIZE),
    ]
}

const gridToPos = (gridPos) => {
    return [
        gridPos[0] * GRID.CELL_SIZE + (GRID.CELL_SIZE / 2),
        gridPos[1] * GRID.CELL_SIZE + (GRID.CELL_SIZE / 2),
    ]
}

const cleanPath = (path = []) => {
    if (path.length <= 1) return path
    let newPath = []
    let dir = [
        path[1][0] - path[0][0],
        path[1][1] - path[0][1],
    ]
    path.forEach((p, i) => {
        if (i === path.length - 1) {
            newPath.push(p)
            return
        }

        let next = path[i + 1]
        let tmpDir = [next[0] - p[0], next[1] - p[1]]
        if (dir[0] !== tmpDir[0] || dir[1] !== tmpDir[1]) {
            dir = tmpDir
            newPath.push(p)
        }
    })
    return newPath
}

const formatPath = (path = []) => {
    const formatted = path.map(p => gridToPos([p.x, p.y]))
    return cleanPath(formatted)
}

export {
    posToGrid,
    gridToPos,
    formatPath,
    cleanPath,
}