import { csrfFetch } from './csrf.js';

const LOAD_ALL_STORES = 'userStore/LOAD_ALL_STORES';
const ADD_STORE = 'userStore/ADD_STORE';
const REMOVE_STORE = 'userStore/REMOVE_STORE';
const GET_CURRENT_STORE = 'userStore/GET_CURRENT_STORE';
const GET_STORE_DETAILS = 'userStore/GET_STORE_DETAILS';

const loadAllStores = (stores) => ({
    type: LOAD_ALL_STORES,
    stores
});

const addStore = (store) => ({
    type: ADD_STORE,
    store
});

const removeStore = (storeId) => ({
    type: REMOVE_STORE,
    storeId
});

const getCurrentStore = (store) => ({
    type: GET_CURRENT_STORE,
    store
});

const getStoreDetails = (store) => ({
    type: GET_STORE_DETAILS,
    store
});

export const fetchAllStores = () => async (dispatch) => {
    const response = await fetch(`/api/stores`);

    if (response.ok) {
        const stores = await response.json();
        dispatch(loadAllStores(stores));
    }
};

export const getStoreByCurrentUser = () => async (dispatch) => {
    const response = await csrfFetch(`/api/stores/current`);

    if (response.ok) {
        const store = await response.json();
        dispatch(getCurrentStore(store));
    }
};

export const createNewStore = (formData) => async (dispatch) => {
    const response = await csrfFetch(`/api/stores`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const newStore = await response.json();
        dispatch(addStore(newStore));
        return newStore;
    }
};

export const deleteStore = (storeId) => async (dispatch) => {
    const response = await csrfFetch(`/api/stores/${storeId}`, { method: "DELETE" });

    if (response.ok) {
        dispatch(removeStore(storeId));
    }
};

export const updateStore = (formData, storeId) => async (dispatch) => {
    const response = await csrfFetch(`/api/stores/${storeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const updatedStore = await response.json();
        dispatch(addStore(updatedStore));
        return updatedStore;
    }
};

export const fetchStoreDetails = (storeId) => async (dispatch) => {
    const response = await fetch(`/api/stores/${storeId}`);

    if (response.ok) {
        const store = await response.json();
        dispatch(getStoreDetails(store));
    }
};

const initialState = { allStores: [] };

const userStoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_STORES:
            return {
                ...state,
                allStores: action.stores
            };
        case ADD_STORE: {
            const newState = {
                ...state,
                allStores: state.allStores.map((store) =>
                    store.id === action.store.id ? action.store : store
                )
            };
            return newState;
        }
        case REMOVE_STORE:
            return {
                ...state,
                allStores: state.allStores.filter((store) =>
                    store.id !== action.storeId
                )
            };
        case GET_CURRENT_STORE:
            return {
                ...state,
                currentStore: action.store
            };
        case GET_STORE_DETAILS:
            return {
                ...state,
                storeDetails: action.store
            };
        default:
            return state;
    }
};

export default userStoreReducer;
