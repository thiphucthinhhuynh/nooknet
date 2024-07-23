import { csrfFetch } from './csrf.js';

// Action Types
const LOAD_ALL_ITEMS = 'item/LOAD_ALL_ITEMS';
const ADD_ITEM = 'item/ADD_ITEM';
const REMOVE_ITEM = 'item/REMOVE_ITEM';
const GET_ITEM_DETAILS = 'item/GET_ITEM_DETAILS';
const LOAD_LIKED_ITEMS = 'item/LOAD_LIKED_ITEMS';

// Action Creators
const loadAllItems = (items) => ({
    type: LOAD_ALL_ITEMS,
    items
});

const addItem = (item) => ({
    type: ADD_ITEM,
    item
});

const removeItem = (itemId) => ({
    type: REMOVE_ITEM,
    itemId
});

const getItemDetails = (item) => ({
    type: GET_ITEM_DETAILS,
    item
});

const loadLikedItems = (items) => ({
    type: LOAD_LIKED_ITEMS,
    items
});

// Thunks
export const fetchAllItems = () => async (dispatch) => {
    const response = await fetch(`/api/items`);

    if (response.ok) {
        const items = await response.json();
        dispatch(loadAllItems(items));
    }
};

export const getItemsByStore = (storeId) => async (dispatch) => {
    const response = await fetch(`/api/stores/${storeId}/items`);

    if (response.ok) {
        const items = await response.json();
        dispatch(loadAllItems(items));
    }
};

export const createNewItem = (formData, storeId) => async (dispatch) => {
    const response = await csrfFetch(`/api/stores/${storeId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const newItem = await response.json();
        dispatch(addItem(newItem));
        return newItem;
    }
};

export const deleteItem = (itemId) => async (dispatch) => {
    const response = await csrfFetch(`/api/items/${itemId}`, { method: "DELETE" });

    if (response.ok) {
        dispatch(removeItem(itemId));
    }
};

export const updateItem = (formData, itemId) => async (dispatch) => {
    const response = await csrfFetch(`/api/items/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const updatedItem = await response.json();
        dispatch(addItem(updatedItem));
        return updatedItem;
    }
};

export const fetchItemDetails = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/items/${itemId}`);

    if (response.ok) {
        const item = await response.json();
        dispatch(getItemDetails(item));
    }
};

export const fetchLikedItems = () => async (dispatch) => {
    const response = await csrfFetch('/api/items/liked-items');

    if (response.ok) {
        const likedItems = await response.json();
        dispatch(loadLikedItems(likedItems));
    }
};

// Redux Reducer
const initialState = { allItems: [], likedItems: [] };

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_ITEMS:
            return {
                ...state,
                allItems: action.items
            };
        case ADD_ITEM: {
            const newState = {
                ...state,
                allItems: state.allItems.map((item) =>
                    item.id === action.item.id ? action.item : item
                )
            };
            return newState;
        }
        case REMOVE_ITEM:
            return {
                ...state,
                allItems: state.allItems.filter((item) => item.id !== action.itemId)
            };
        case GET_ITEM_DETAILS:
            return {
                ...state,
                itemDetails: action.item
            };
        case LOAD_LIKED_ITEMS:
            return {
                ...state,
                likedItems: action.items
            };
        default:
            return state;
    }
};

export default itemReducer;
