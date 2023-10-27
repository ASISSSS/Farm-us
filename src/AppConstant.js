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
    POSITION_START_X: 620,
    POSITION_START_Y: 200,
}

const ENTITY = {
    SPEED: 2,
    CHANGE_IMAGE_FRAME: 8,
}

const CAMERA = {
    SPEED: 60,
}

const DUMMIES_TYPES = {
    BLUE: 0,
    GREEN: 1,
    YELLOW: 2,
    ALIENS: 3
}

const SPWANERS = {
    BLUE: { x: 615, y: 130, timer: 10, maxSpawn: 1, type: DUMMIES_TYPES.BLUE },
    GREEN: { x: 700, y: 278, timer: 2000, maxSpawn: 2, type: DUMMIES_TYPES.GREEN },
    YELLOW: { x: 550, y: 278, timer: 100, maxSpawn: 5, type: DUMMIES_TYPES.YELLOW },
    ALIENS: [
        { x: 915, y: 546, timer: 50, maxSpawn: 28, type: DUMMIES_TYPES.ALIENS },
        { x: 117, y: 382, timer: 50, maxSpawn: 28, type: DUMMIES_TYPES.ALIENS },
        { x: 1010, y: 160, timer: 50, maxSpawn: 28, type: DUMMIES_TYPES.ALIENS },
        { x: 610, y: 610, timer: 50, maxSpawn: 28, type: DUMMIES_TYPES.ALIENS },
    ],
}

const POSITION = {
    ADMINDESK: { x: 700, y: 395.5, scale: 0.5 },
    NAVIGATION: { x: 1042, y: 308, scale: 0.3 },
    BED: {
        SCALE: 0.8,
        REVERSED: [
            { x: 384, y: 250 },
            { x: 384, y: 270 },
            { x: 384, y: 290 },
            { x: 384, y: 310 },
        ],
        NORMAL: [
            { x: 460, y: 250 },
            { x: 460, y: 270 },
            { x: 460, y: 290 },
            { x: 460, y: 310 },
            { x: 460, y: 330 },
        ]
    },
    TRASH: { x: 560, y: 480, scale: 0.8 },
    NUCLEARTRASH: {
        SCALE: 0.8,
        POSITIONS:  [
            { x: 87, y: 274 },
            { x: 87, y: 316 },
            { x: 87, y: 336 },
            { x: 87, y: 382 },
        ]
    },
    O2: {
        SCALE: 0.8,
        POSITIONS:  [
            { x: 765, y: 280 },
            { x: 755, y: 280 },
            { x: 735, y: 300 },
            { x: 745, y: 300 },
            { x: 730, y: 310 },
            { x: 741, y: 310 },
        ]
    }
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
    ENTITY,
    POSITION,
}