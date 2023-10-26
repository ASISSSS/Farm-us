import { useSyncExternalStore } from 'react'

let gameState = {
    clickPos: undefined,
}
let listeners = []

const emitChange = () => {
    for (let listener of listeners) {
        listener()
    }
}

const subscribe = (listener) => {
    listeners = [...listeners, listener]
    return () => {
        listeners = listeners.filter(l => l !== listener)
    }
}

const getSnapshot = () => {
    return gameState
}

const gameStateAction = {
    setClickPos: clickPos => {
        gameState = { ...gameState, clickPos }
        emitChange()
    },
}

const useGameState = () => {
    return useSyncExternalStore(subscribe, getSnapshot)
}

export default useGameState
export {
    gameStateAction,
}