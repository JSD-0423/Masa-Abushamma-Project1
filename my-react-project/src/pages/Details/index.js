import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchDataById } from '../../component/fetchData';

import './Details.css'
import Rating from '../../component/Rating';
import ErrorMessage from '../../component/ErrorMessage';
import Spinner from '../../component/Spinner';
import { getFavorites, getIsFavorites, handleToggleFavorite } from '../../component/FavouriteBanner';

const Details = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [isDisplayData, setisDisplayData] = useState(false);
    const [sideCardButtonText, setSideCardButtonText] = useState('');
    const [favorites, setFavorites] = useState(getFavorites());
    const [isFavorite, setIsFavorite] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchDataById(id);
            setData(response);
            setisDisplayData(true);
        };
        fetchData();
        if (!getIsFavorites(id)) {
            setSideCardButtonText("Add to Favorites");
        } else {
            setSideCardButtonText("Remove from Favorites");
        }


    }, []);
    function toggleFavorites() {
        handleToggleFavorite(id,setSideCardButtonText);
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
                    <div className="side-card position-absolute shadow-sm">
                        <div className="sidecard-image-container">
                            {data?.image ?
                                <img className="side-card-image w-100 object-fit-cover" src={require(`../../images/${data?.image}`)} /> : <Spinner isDisplay={isDisplayData} />}
                        </div>
                        <div className="side-card-details-container">
                            <div>
                                <div className="course-name-author align-items-center">
                                    <h3
                                        className="h1 course-name overflow-hidden text-nowrap text-truncate m-0 fw-bold"
                                    >{data?.topic}</h3>
                                    <span className="text-dark">by</span><a className="author-name">{data?.name}</a>
                                </div>
                                <div className="side-card-box">
                                    <div className="side-card-content">
                                        <p className="overflow-hidden text-nowrap text-truncate">
                                            Interested about this topic ?
                                        </p>
                                        <button
                                            className="side-card-button w-100 overflow-hidden text-nowrap text-truncate"
                                            id="favorites-button"
                                            onClick={toggleFavorites}
                                        >
                                            <span
                                                id="side-card-button-text"
                                                className="text-light"
                                            >{sideCardButtonText}</span>
                                            <ion-icon name="heart-outline"></ion-icon>
                                        </button>
                                        <div
                                            className="credites-text overflow-hidden text-nowrap text-truncate"
                                        >
                                            UnLimited Credits
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sub-topics-section details-page-container">
                {isDisplayData ? (
                    <table className="table mt-4 topic-tabel rounded m-0">
                        <thead>
                            <tr>
                                <th
                                    className="h4 px-4 align-items-center py-3 overflow-hidden text-truncate table-row"
                                >
                                    {data?.topic} Sub Topics
                                </th>
                            </tr>
                        </thead>
                        <tbody id="tBody">
                            {data?.subtopics.map((x, index) => {
                                return (
                                    <tr key={`${index}`}>
                                        <td className="d-flex px-4 gap-2 align-items-center py-3 overflow-hidden text-truncate">
                                            <ion-icon name="checkmark-circle-outline"></ion-icon><p className="m-0">{x}</p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <ErrorMessage></ErrorMessage>
                    </table>) : <Spinner isDisplay={isDisplayData} />}
            </section>
        </div>
    )
};

export default Details;  