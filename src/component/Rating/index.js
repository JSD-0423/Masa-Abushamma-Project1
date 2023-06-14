import React from 'react';

import './rating.css'

const Rating = ({ratingValue}) => {
    return (
        <div className='rating d-flex'>{

            Array.from({ length: 5 }).map((_, index) => (
                <span data-value={index}>
                    <ion-icon name={index < ratingValue ? 'star-sharp' : 'star-outline'}></ion-icon>
                </span>
            ))

        }</div>
    );
};

export default Rating;  