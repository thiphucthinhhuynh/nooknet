import './StoreReviews.css';
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

    return (
        <div>
            <h1>Hi from StoreReviews</h1>

            {!isOwner && !hasPostedReview &&
                <OpenModalMenuItem itemText="Write a Review" modalComponent={<CreateReview userId={sessionUser.id} storeId={storeId} />} />}

            {reviews.reverse().map(({ id, body, User }) => {
                const isReviewer = sessionUser.id === User.id;

                return (
                    <div key={id}>
                        <div>{User.username}</div>
                        <div>{body}</div>
                    </div>
                );
            })}

        </div>
    );
};

export default StoreReviews;
