const VIEW = {
    TITLE_SCREEN: 'TITLE_SCREEN',
    TUTO: 'TUTO',
    GAME: 'GAME',
}

const WORLD_SIZE = {
    WIDTH: 1200,
    HEIGHT: 693,
}

const PLAYER = {
    SPEED: 2,
    CHANGE_IMAGE_FRAME: 10,
    POSITION_START_X: 620,
    POSITION_START_Y: 200,
}

const CAMERA = {
    SPEED: 60
}

const DUMMIES_TYPES = {
    BLUE: 0,
    GREEN: 1,
    YELLOW: 2
}

const SPWANERS = {
    BLUE: { x: 4000, y: 1300, timer: 1000, type: DUMMIES_TYPES.BLUE },
    GREEN: { x: 4600, y: 1300, timer: 2000, type: DUMMIES_TYPES.GREEN },
    YELLOW: { x: 5200, y: 1300, timer: 100, type: DUMMIES_TYPES.YELLOW }
}

const GRID = {
    CELL_SIZE: 2,
    LINE_WIDTH: 0.1,
}

export {
    VIEW,
    WORLD_SIZE,
    PLAYER,
    DUMMIES_TYPES,
    SPWANERS,
    CAMERA,
    GRID,
}