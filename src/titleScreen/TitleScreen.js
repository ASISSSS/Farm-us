import React from 'react'
import { VIEW } from '../AppConstant'
import PropTypes from 'prop-types'

const TitleScreen = ({
    setView = () => {},
}) => {
    return (
        <div
            style={{
                backgroundImage: 'url(https://images.pexels.com/photos/2892619/pexels-photo-2892619.jpeg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '100% auto',
                width: '100vw',
                height: '100vh',
                position: 'relative',
            }}
        >
            <button
                onClick={() => setView(VIEW.GAME)}
                style={{
                    position: 'absolute',
                    display: 'block',
                    top: '45%',
                    left: '50%',
                    cursor: 'pointer',
                }}
            >
                PLAY
            </button>
            <button
                onClick={() => setView(VIEW.TUTO)}
                style={{
                    position: 'absolute',
                    display: 'block',
                    top: '55%',
                    left: '50%',
                    cursor: 'pointer',
                }}
            >
                TUTO
            </button>
        </div>
    )
}

TitleScreen.propTypes = {
    setView: PropTypes.func,
}

export default TitleScreen