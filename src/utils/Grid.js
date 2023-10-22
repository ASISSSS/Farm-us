import { GRID } from '../AppConstant'

const posToGrid = (pos) => {
    return [
        Math.floor(pos[0] / GRID.CELL_SIZE),
        Math.floor(pos[1] / GRID.CELL_SIZE),
    ]
}

export {
    posToGrid,
}