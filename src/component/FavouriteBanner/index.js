import React, { useState } from 'react';
import { useEffect } from 'react';

import './Favourite.css'
import Spinner from '../Spinner';
import { fetchDataById } from '../fetchData';
import FavouriteCard from '../FavouriteCard';
export const getFavorites = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
};
export const updateFavorites = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};
export const getIsFavorites = (favoriteId) => {
    return getFavorites().includes(favoriteId);

};
export const addToFavorites = (id) => {
    const favorites = getFavorites();
    favorites.push(id)
    localStorage.setItem('favorites', JSON.stringify(favorites));
};
export const removeFromFavorites = (id) => {
    const favorites = getFavorites();
    const newArray = favorites.filter((item) => item !== id);
    localStorage.setItem('favorites', JSON.stringify(newArray));
};


export const handleToggleFavorite = (id, setSideCardButtonText) => {
    if (!getIsFavorites(id)) {
        setSideCardButtonText("Remove from Favorites");
        addToFavorites(id)

    } else {
        setSideCardButtonText("Add to Favorites");
        removeFromFavorites(id)
    }

};
const FavouriteBanner = () => {
    const [isDisplayData, setisDisplayData] = useState(false);
    const [favorites, setFavorites] = useState(getFavorites());
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDataForFavorites = async () => {
            const promises = favorites.map((favorite) => fetchDataById(favorite));
            const arrayOfData = await Promise.all(promises);
            setData(arrayOfData);
        };

        fetchDataForFavorites();
        setisDisplayData(true)


    }, [favorites]);

    return (
        <div
            className="favourite-container w-100 position-fixed bottom-0 left-0 py-4 px-5"
        >
            <div className="container-fluid w-100">
                <p className="h5 pb-2"><strong>My Favourite Topics</strong></p>
                <div className="d-flex overflow-auto">
                    <Spinner isDisplay={isDisplayData} />
                    <div className="favourite-items d-flex gap-3">
                        {data.map((x) => {
                            return <FavouriteCard value={x} />
                        })}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavouriteBanner;