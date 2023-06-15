import React, { useEffect, useState } from 'react';

import './card.css'
import Rating from '../Rating';

const Card = ({value}) => {
    return (
        <div className='col'>
        <div className='course-card card rounded overflow-hidden shadow-sm'>
            <img src={require(`../../images/${value?.image}`)} alt={value?.image} className='card-img-top w-100 bg-white object-fit-cover' width={400} height={200} />
            <div className='details-container card-body'>
                <p className='topic overflow-hidden text-truncate m-0'>{value?.category}</p>
                <h1 className='m-0 h1 text-break fw-bold'>{value?.topic}</h1>
                <Rating ratingValue={value.rating}/>
                <p className='author-name m-0 overflow-hidden text-truncate font-weight-light text-decoration-none pt-1'>{`Author: ${value?.name}`}</p>

            </div>

        </div>
    </div>
    );
};

export default Card;  