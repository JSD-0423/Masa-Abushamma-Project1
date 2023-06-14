import React from 'react';

import './light-button.css'

const LightButton = ({ onClickFunction, iconName, textId, textContent }) => {

    return (
        <button
            className="light-button dark-mood-button d-flex gap-1 align-items-center rounded px-2 py-1"
            onClick={onClickFunction}
        >
            <ion-icon name={iconName}></ion-icon>
            <p className="m-0 d-none d-md-block" id={textId}>{textContent}</p>
        </button>
    )
};

export default LightButton;  