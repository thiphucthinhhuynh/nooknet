import { csrfFetch } from './csrf.js';

// Action Types
const LOAD_ITEM_LIKES = 'like/LOAD_ITEM_LIKES';
const ADD_LIKE = 'like/ADD_LIKE';
const REMOVE_LIKE = 'like/REMOVE_LIKE';

// Action Creators
const loadItemLikes = (likes) => ({
    type: LOAD_ITEM_LIKES,
    likes
});

const addLike = (like) => ({
    type: ADD_LIKE,
    like
});

const removeLike = (likeId) => ({
    type: REMOVE_LIKE,
    likeId
});

// Thunks
export const fetchItemLikes = (itemId) => async (dispatch) => {
    const response = fetch(`/api/items/${itemId}/likes`);

    if (response.ok) {
        const likes = await response.json();
        dispatch(loadItemLikes(likes));
    }
};

export const likeItem = (itemId) => async (dispatch) => {
    const response = csrfFetch(`/api/items/${itemId}/likes`, { method: 'POST' });

    if (response.ok) {
        const newLike = await response.json();
        dispatch(addLike(newLike));
    }
};

export const unlikeItem = (itemId) => async (dispatch) => {
    const response = await csrfFetch(`/api/likes/${likeId}`, { method: 'DELETE' });

    if (response.ok) {
        dispatch(removeLike(likeId));
    }
};

// Redux Reducer
const initialState = { likes: [] };

const likeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ITEM_LIKES:
            return {
                ...state,
                likes: action.likes
            };
        case ADD_LIKE:
            return {
                ...state,
                likes: [...state.likes, action.like]
            };
        case REMOVE_LIKE:
            return {
                ...state,
                likes: state.likes.filter((like) => like.id !== action.likeId)
            };
        default:
            return state;
    }
};

export default likeReducer;
