import React from 'react'
import { VIEW } from '../AppConstant'
import PropTypes from 'prop-types'

const Tuto = ({
    setView = () => {},
}) => {
    return (
        <div>
            <button
                onClick={() => setView(VIEW.TITLE_SCREEN)}
            >
                {'<<<<'}
            </button>
            TUTO
        </div>
    )
}

Tuto.propTypes = {
    setView: PropTypes.func,
}

export default Tuto