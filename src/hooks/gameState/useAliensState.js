import { useSyncExternalStore } from 'react'

let alienId = 0
let aliens = []
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
    return aliens
}

const aliensAction = {
    add: alien => {
        aliens = [...aliens, { ...alien, id: ++alienId }]
        emitChange()
    },
    addAll: listAliens => {
        aliens = [...aliens, ...listAliens.map(alien => ({ ...alien, id: ++alienId }))]
        emitChange()
    },
    delete: id => {
        aliens = aliens.filter(d => d.id !== id)
        emitChange()
    },
    update: (id, newAlien) => {
        aliens = aliens.map(alien => alien.id === id ? newAlien : alien)
        emitChange()
    },
}


const useAliensState = () => {
    return useSyncExternalStore(subscribe, getSnapshot)
}

export default useAliensState
export {
    aliensAction,
}