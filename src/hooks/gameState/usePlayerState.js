import { useSyncExternalStore } from 'react'
import { PLAYER } from '../../AppConstant'

let player = {
    pos: {
        x: PLAYER.POSITION_START_X,
        y: PLAYER.POSITION_START_Y,
    },
    target: {
        x: PLAYER.POSITION_START_X,
        y: PLAYER.POSITION_START_Y,
    },
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
    return player
}

const playerAction = {
    setPlayer: changes => {
        player = { ...player, ...changes }
        emitChange()
    },
}

const usePlayerState = () => {
    return useSyncExternalStore(subscribe, getSnapshot)
}

export default usePlayerState
export {
    playerAction,
}