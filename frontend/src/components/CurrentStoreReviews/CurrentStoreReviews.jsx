import './CurrentStoreReviews.css';
import { FaStar, FaRegStar } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { getReviewsByStore, getUserReviews } from '../../store/review.js';

const CurrentStoreReviews = () => {
    const [activeComponent, setActiveComponent] = useState('StoreReviews');
    const dispatch = useDispatch();
    const { userStore, sessionUser } = useOutletContext();
    const reviews = useSelector((state) => state.reviewState.allReviews);
    const userReviews = useSelector((state) => state.reviewState.userReviews);

    useEffect(() => {
        dispatch(getReviewsByStore(userStore.id));
        dispatch(getUserReviews());
    }, [dispatch, userStore]);

    const lastedReviews = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const lastedUserReviews = [...userReviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const renderStars = (rating) => {
        const starsArray = [];

        for (let i = 1; i <= rating; i++) {
            if (i <= rating) {
                starsArray.push(<FaStar key={i} className="star-icon" />);
            } else {
                starsArray.push(<FaRegStar key={i} className="star-icon" />);
            }
        }
        return starsArray;
    };

    return (
        <div className="current-store-reviews">
            <div>
                <button
                    className={`button ${activeComponent === 'StoreReviews' ? 'active' : 'inactive'}`}
                    onClick={() => setActiveComponent('StoreReviews')}
                >Reviews about You</button>
                <button
                    className={`button ${activeComponent === 'MyReviews' ? 'active' : 'inactive'}`}
                    onClick={() => setActiveComponent('MyReviews')}
                >Reviews by You</button>
            </div>

            {activeComponent === 'StoreReviews' &&
                <div className="review-container">
                    {lastedReviews.map(({ id, body, stars, User }) => {
                        return (
                            <div key={id} className="review-tile">
                                <div>{User.username}</div>
                                <div >{renderStars(stars)}</div> {/* Render stars */}
                                <div>{body}</div>
                            </div>
                        );
                    })}
                </div>
            }

            {activeComponent === 'MyReviews' &&
                <div className="review-container">
                    {lastedUserReviews.map(({ id, body, stars, Store }) => {
                        return (
                            <div key={id} className="review-tile">
                                <div>{sessionUser.username}</div>
                                <div>{Store?.name}</div>
                                <div>{renderStars(stars)}</div> {/* Render stars */}
                                <div>{body}</div>
                            </div>
                        );
                    })}
                </div>
            }

        </div>
    );
};

export default CurrentStoreReviews;
