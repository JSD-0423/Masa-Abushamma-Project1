import React, { useContext, useState } from 'react';
import { useEffect } from 'react';

import Spinner from '../Spinner';
import { fetchDataById } from '../fetchData';
import FavouriteCard from '../FavouriteCard';

import './favourite.css'
import { FavoritesContext } from '../../contexts/DataContext/FavouriteContext';

const FavouriteBanner = () => {
    const [isDisplayData, setisDisplayData] = useState(false);
    const [data, setData] = useState([]);
    const favorites = useContext(FavoritesContext);

    useEffect(() => {
        const fetchDataForFavorites = async () => {
            const promises = favorites.getFavorites()?.map((favorite) => fetchDataById(favorite));
            const arrayOfData = await Promise.all(promises);
            setData(arrayOfData);
        };

        fetchDataForFavorites();
        setisDisplayData(true)


    }, [favorites,favorites.favouriteValue]);

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