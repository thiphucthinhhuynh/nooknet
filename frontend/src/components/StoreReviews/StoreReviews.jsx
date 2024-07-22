import './StoreReviews.css';
import { FaStar, FaRegStar } from "react-icons/fa6";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateReview from '../CreateReview';
import { fetchStoreDetails } from '../../store/userStore.js';
import { getReviewsByStore } from '../../store/review.js';

const StoreReviews = () => {
    const dispatch = useDispatch();
    const { storeId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const thisStore = useSelector((state) => state.userStoreState.storeDetails);
    const reviews = useSelector((state) => state.reviewState.allReviews);
    const isOwner = thisStore.Owner.id === sessionUser.id;
    const hasPostedReview = reviews.some(review => review.userId === sessionUser.id && review.storeId == storeId);

    useEffect(() => {
        dispatch(fetchStoreDetails(storeId));
        dispatch(getReviewsByStore(storeId));
    }, [dispatch, storeId]);

    const lastedReviews = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const renderStars = (rating) => {
        const starsArray = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsArray.push(<FaStar key={i} className="star-icon" />);
            } else {
                starsArray.push(<FaRegStar key={i} className="star-icon" />);
            }
        }
        return starsArray;
    };

    return (
        <div className="review-container">

            {!isOwner && !hasPostedReview &&
                <div className="button"><OpenModalMenuItem itemText="Write a Review" modalComponent={<CreateReview userId={sessionUser.id} storeId={storeId} />} /></div>}

            <p className="header">Reviews</p>
            {lastedReviews.map(({ id, body, stars, User }) => {

                // This boolean for adding UpdateReview and DeleteReview later on
                // const isReviewer = sessionUser.id === User.id;

                return (
                    <div key={id} className="review-tile">
                        <div>{User.username}</div>
                        <div >{renderStars(stars)}</div> {/* Render stars */}
                        <div>{body}</div>
                    </div>
                );
            })}

        </div>
    );
};

export default StoreReviews;
