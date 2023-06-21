import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import LightButton from '../LightButton';

import './header.css'
import { ThemeContext } from '../../contexts/Theme/ThemeContext';

const Header = ({ toggleFavoriteSlide }) => {
    const themeMode = useContext(ThemeContext);
    const [ModeScreenText, setModeScreenText] = useState('');
    useEffect(() => {
        if (themeMode.currentTheme.name === 'dark') {
            setModeScreenText('Light Mode')
        } else {
            setModeScreenText('Dark Mode')
        }

    }, [themeMode]);
    const switchTheme = () => {
        setModeScreenText(themeMode.toggleTheme());
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