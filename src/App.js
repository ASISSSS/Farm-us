import React, { useState } from 'react'
import TitleScreen from './titleScreen/TitleScreen'
import { VIEW } from './AppConstant'
import Tuto from './tuto/Tuto'
import Game from './game/Game'

const App = () => {
    const [view, setView] = useState(VIEW.GAME)

    return (
        <div>
            {view === VIEW.TITLE_SCREEN && (<TitleScreen setView={setView}/>)}
            {view === VIEW.TUTO && (<Tuto setView={setView} />)}
            {view === VIEW.GAME && (<Game setView={setView} />)}
        </div>
    )
}

export default App