import { csrfFetch } from './csrf';

const LOAD_ALL_ITEMS = 'item/LOAD_ALL_ITEMS';
const ADD_ITEM = 'item/ADD_ITEM';
const REMOVE_ITEM = 'item/REMOVE_ITEM';

const loadAllItems = (items) => ({
    type: LOAD_ALL_ITEMS,
    items
});

const addItem = (item) => ({
    type: ADD_ITEM,
    item
});

const removeItem = (item) => ({
    type: REMOVE_ITEM,
    item
});

export const fetchAllItems = () => async (dispatch) => {
    const response = await fetch(`/api/items`);

    if (response.ok) {
        const items = await response.json();
        dispatch(loadAllItems(items));
    }
};

export const getItemsByCurrentUser = () => async (dispatch) => {
    const response = await csrfFetch(`/api/items/current`);

    if (response.ok) {
        const items = await response.json();
        dispatch(loadAllItems(items));
    }
};

export const createNewItem = (formData) => async (dispatch) => {
    const response = csrfFetch(`/api/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const newItem = await response.json();
        dispatch(addItem(newItem));
        return newItem;
    }
};

export const deleteItem = (itemId) => async (dispatch) => {
    const response = csrfFetch(`/api/items/${itemId}`, { method: "DELETE" });

    if (response.ok) {
        dispatch(removeItem(itemId));
    }
};

export const updateItem = (formData, itemId) => async (dispatch) => {
    const response = await csrfFetch(`/api/items/${itemId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const updatedItem = await response.json();
        dispatch(addItem(updatedItem));
        return updatedItem;
    }
};

const initialState = {
    allItems: []
};

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
        default:
            return state;
    }
};

export default itemReducer;
