import React from 'react';

import './DesignBanner.css'

const DesignBanner = () => {

    return (
        <section className="design-section">
            <div className="cross-design w-100 position-relative">
                <div className="cross-bottom w-100 h-100 position-absolute"></div>
                <div className="cross-top w-100 h-100"></div>
            </div>
            <div
                className="position-relative d-flex justify-content-center position-relative design-section-text"
            >
                <div>
                    <h2 className="m-0">Welcome to our website!</h2>
                    <p>We have a new design that's fresh, modern, and easy to use.</p>
                </div>
            </div>
        </section>
    );
};

export default DesignBanner;