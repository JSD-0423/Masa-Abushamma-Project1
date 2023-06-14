import React, { useState } from 'react';
import { useEffect } from 'react';

import './favourite-card.css'
import { Link } from 'react-router-dom';
import Rating from '../Rating';


const FavouriteCard = ({value}) => {


    return (
        <Link to={`/Details/${value.id}`} style={{textDecoration:'none'}}>
            <div className='favourite-card overflow-hidden m-1 rounded w-100'>
                <div className='image-favourite-card'>
                    <img src={require(`../../images/${value?.image}`)} className='object-fit-cover w-100'></img>
                </div>
                <div className='details py-2'>
                    <h1 className='overflow-hidden text-nowrap text-truncate p-0 m-0 fw-bold'>{value.topic}</h1>
                    <Rating ratingValue={value.rating}/>
                </div>
            </div>
        </Link>

    );
};

export default FavouriteCard;