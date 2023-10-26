import { useSyncExternalStore } from 'react'

let dummyId = 0
let dummies = []
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
    return dummies
}

const dummiesAction = {
    add: dummy => {
        dummies = [...dummies, { ...dummy, id: ++dummyId }]
        emitChange()
    },
    delete: id => {
        dummies = dummies.filter(d => d.id !== id)
        emitChange()
    },
    update: (id, change) => {
        dummies = dummies.map(dummy => dummy.id === id ? { ...dummy, ...change } : dummy)
        emitChange()
    },
    updateAll: (changes) => {
        dummies = dummies.map(dummy => {
            const change = changes.find(c => c.id === dummy.id)
            if (change) {
                return { ...dummy, ...change }
            }
            return dummy
        })
        emitChange()
    },
}


const useDummiesState = () => {
    return useSyncExternalStore(subscribe, getSnapshot)
}

export default useDummiesState
export {
    dummiesAction,
}