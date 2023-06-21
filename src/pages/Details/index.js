import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Rating from '../../component/Rating';
import Spinner from '../../component/Spinner';
// import { getIsFavorites, handleToggleFavorite } from '../../component/FavouriteBanner';
import { fetchDataById } from '../../component/fetchData';

import './Details.css'
import TableComponent from '../../component/TableComponent';
import SideCard from '../../component/SideCard';
import { FavoritesContext } from '../../contexts/DataContext/FavouriteContext';

const Details = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [isDisplayData, setisDisplayData] = useState(false);
    const [sideCardButtonText, setSideCardButtonText] = useState('');
    const favourite=useContext(FavoritesContext);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchDataById(id);
            setData(response);
            setisDisplayData(true);
        };
        fetchData();
        if (!favourite.getIsFavorites(id)) {
           setSideCardButtonText("Add to Favorites");
        } else {
           setSideCardButtonText("Remove from Favorites");
         }


    }, [id,favourite]);
    function toggleFavorites() {
        favourite.handleToggleFavorite(id,setSideCardButtonText);
    }
    return (
        <div className='detailsPage'>
            <section className="summary-box-section w-100 text-light bg-dark">
                <div
                    className="summary-box-container details-page-container position-relative"
                >
                    <div className="summary-box py-4">
                        <Spinner isDisplay={isDisplayData} />
                        <h2 className="category overflow-hidden text-nowrap text-truncate">{data?.category}</h2>
                        <h2
                            className="h1 name overflow-hidden text-nowrap text-truncate text-light"
                        >{data?.topic}</h2>
                        <Rating ratingValue={data?.rating}></Rating>
                        <p
                            className="details text-light pt-4 overflow-hidden text-truncate text-wrap"
                        >{data?.description}</p>
                    </div>
                    <SideCard isDisplayData={isDisplayData} data={data} sideCardButtonText={sideCardButtonText} toggleFavorites={toggleFavorites}/>
                </div>
            </section>
            <section className="sub-topics-section details-page-container">
                {isDisplayData ? (
                   <TableComponent data={data}/>
                   ) : <Spinner isDisplay={isDisplayData} />}
            </section>
        </div>
    )
};

export default Details;  