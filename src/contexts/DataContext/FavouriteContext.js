import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favouriteValue,setFavourite]=useState([]);
    const getFavorites = () => {
        const favorites = localStorage.getItem('favorites');
        setFavourite(favorites)
        return favorites ? JSON.parse(favorites) : [];
    };
    const getIsFavorites = (favoriteId) => {
        return getFavorites()?.includes(favoriteId);

    };
    const addToFavorites = (id) => {
        let favorites = getFavorites();
        setFavourite(favorites)
        if (!favorites) {
            favorites = [id]
        }
        else {
            favorites?.push(id)
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };
    const removeFromFavorites = (id) => {
        const favorites = getFavorites();
        const newArray = favorites.filter((item) => item !== id);
        setFavourite(favorites)
        localStorage.setItem('favorites', JSON.stringify(newArray));
    };
    const handleToggleFavorite = (id, setSideCardButtonText) => {
        if (!getIsFavorites(id)) {
            setSideCardButtonText("Remove from Favorites");
            addToFavorites(id)

        } else {
            setSideCardButtonText("Add to Favorites");
            removeFromFavorites(id)
        }

    };
    return (
        <FavoritesContext.Provider value={{ getFavorites, handleToggleFavorite, getIsFavorites,favouriteValue }}>
            {children}
        </FavoritesContext.Provider>
    )

}