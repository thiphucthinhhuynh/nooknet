import { csrfFetch } from './csrf.js';

// Action Types
const FOLLOW_USER = 'follow/FOLLOW_USER';
const UNFOLLOW_USER = 'follow/UNFOLLOW_USER';
const SET_FOLLOWERS = 'follow/SET_FOLLOWERS';
const SET_FOLLOWEES = 'follow/SET_FOLLOWEES';

// Action Creators
const followUser = (follow) => ({
    type: FOLLOW_USER,
    follow
});

const unfollowUser = (receiverId) => ({
    type: UNFOLLOW_USER,
    receiverId
});

const setFollowers = (followers) => ({
    type: SET_FOLLOWERS,
    followers
});

const setFollowees = (followees) => ({
    type: SET_FOLLOWEES,
    followees
});

// Thunks
export const follow = (senderId, receiverId) => async (dispatch) => {
    const response = await csrfFetch(`/api/requests/follow`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId, receiverId })
    });

    if (response.ok) {
        const follow = await response.json();
        dispatch(followUser(follow));
    }
};

export const unfollow = (senderId, receiverId) => async (dispatch) => {
    const response = await csrfFetch(`/api/requests/unfollow`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId, receiverId })
    });

    if (response.ok) {
        dispatch(unfollowUser(receiverId));
    }
};

export const fetchFollowers = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/followers`);

    if (response.ok) {
        const followers = await response.json();
        dispatch(setFollowers(followers));
    }
};

export const fetchFollowees = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/followees`);

    if (response.ok) {
        const followees = await response.json();
        dispatch(setFollowees(followees));
    }
};

// Redux Reducer
const initialState = { followers: [], followees: [] };

const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                followees: [...state.followees, action.type]
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                followees: state.followees.filter(followee => followee.id !== action.userId)
            };
        case SET_FOLLOWERS:
            return {
                ...state,
                followers: action.followers
            };
        case SET_FOLLOWEES:
            return {
                ...state,
                followees: action.followees
            };
        default:
            return state;
    }
};

export default followReducer;
