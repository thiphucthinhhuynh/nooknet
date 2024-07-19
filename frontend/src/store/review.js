import { csrfFetch } from './csrf.js';

// Action Types
const LOAD_ALL_REVIEWS = 'review/LOAD_REVIEWS';
const ADD_REVIEW = 'review/ADD_REVIEW';
const REMOVE_REVIEW = 'review/REMOVE_REVIEW';

// Action Creators
const loadAllReviews = (reviews) => ({
    type: LOAD_ALL_REVIEWS,
    reviews
});

const addReview = (review) => ({
    type: ADD_REVIEW,
    review
});

const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
});

// Thunks
export const getReviewsByStore = (storeId) => async (dispatch) => {
    const response = await fetch(`/api/stores/${storeId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadAllReviews(reviews));
    }
};

export const createNewReview = (formData, storeId) => async (dispatch) => {
    const response = await csrfFetch(`/api/stores/${storeId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(addReview(newReview));
        return newReview;
    }
};

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, { method: "DELETE" });

    if (response.ok) {
        dispatch(removeReview(reviewId));
    }
};

export const updateReview = (formData, reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(addReview(updatedReview));
        return updatedReview;
    }
};

// Redux Reducer
const initialState = { allReviews: [] };

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_REVIEWS:
            return {
                ...state,
                allReviews: action.reviews
            };
        case ADD_REVIEW: {
            const newState = {
                ...state,
                allReviews: state.allReviews.map((review) =>
                    review.id === action.review.id ? action.review : review
                )
            };
            return newState;
        }
        case REMOVE_REVIEW:
            return {
                ...state,
                allReviews: state.allReviews.filter((review) => review.id !== action.reviewId)
            };
        default:
            return state;
    }
};

export default reviewReducer;
