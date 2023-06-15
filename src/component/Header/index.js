import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LightButton from '../LightButton';

import './header.css'

const Header = ({ toggleFavoriteSlide }) => {
    const [ModeScreenText, setModeScreenText] = useState('');
    function setMode(Mode,ModeText){
        document.documentElement.setAttribute('data-theme', Mode);
        setModeScreenText(ModeText)
    }
    useEffect(() => {
        if (localStorage.getItem('darkBtnClicked') === 'true') {
            setMode('dark','Light Mode')
        } else {
            setMode('light','Dark Mode')
        }

    }, []);
    const switchTheme = () => {
        if (document.documentElement.getAttribute('data-theme') == 'dark') {
            localStorage.setItem('darkBtnClicked', false);
            setMode('light','Dark Mode')
        }
        else {
            localStorage.setItem('darkBtnClicked', true);
            setMode('dark','Light Mode')
        }
    };


    return (
        <header className="w-100 shadow-sm position-relative">
            <div
                className="container header-container w-100 h-100 d-flex justify-content-between align-items-center"
            >
                <Link to={'/'}>
                <h1
                    className="weight-light overflow-hidden text-nowrap text-truncate"
                    id="web-topic"
                >
                    Web Topics
                </h1>
                </Link>
                <div className="d-flex gap-1">
                    <LightButton onClickFunction={switchTheme} iconName={'moon-outline'} textId={'screen-mode-text'} textContent={ModeScreenText} />
                    <LightButton onClickFunction={toggleFavoriteSlide} iconName={'heart-outline'} textId={'Favourite-text'} textContent={'Favourites'} />
                </div>
            </div>
        </header>
    );
};

export default Header;