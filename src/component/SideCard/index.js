import ErrorMessage from '../ErrorMessage';
import Spinner from '../Spinner';

import './side-card.css'

const SideCard = ({ data, isDisplayData, sideCardButtonText, toggleFavorites }) => {



    return (
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
    );
};

export default SideCard;