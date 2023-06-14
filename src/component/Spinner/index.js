import React, { useEffect, useState } from 'react';
import spinnerImage from '../../images/Spinner.svg';

import './spinner.css'

const Spinner = ({isDisplay}) => {
    return (
        <>
            <img
                src={spinnerImage}
                alt="Loading"
                id="cards-loading-icon"
                style={{ display: isDisplay?'none':'block' }}
                className="mx-auto"
            />
        </>
    );
};

export default Spinner;  