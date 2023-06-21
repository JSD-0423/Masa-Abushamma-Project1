import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const lightTheme = {
        name: 'light',
    };

    const darkTheme = {
        name: 'dark',
    };
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme === 'dark' ? darkTheme : lightTheme;
    const [currentTheme, setCurrentTheme] = useState(initialTheme);
    document.documentElement.setAttribute('data-theme', currentTheme.name);
    const toggleTheme = () => {
        setCurrentTheme(prevTheme => (prevTheme.name === 'light' ? darkTheme : lightTheme));
        document.documentElement.setAttribute('data-theme', currentTheme.name);
        localStorage.setItem('theme', currentTheme.name === 'dark' ? lightTheme.name : darkTheme.name);
        return currentTheme.name === 'dark' ? ('Dark Mode') : ('Light Mode')
    };
    return (
        <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}