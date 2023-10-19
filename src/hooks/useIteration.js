import { useTick } from '@pixi/react'
import { useState } from 'react'

const useIteration = (incr = 0.1) => {
    const [i, setI] = useState(0)

    useTick(delta => {
        setI(prevI => prevI + incr * delta)
    })

    return i
}

export default useIteration