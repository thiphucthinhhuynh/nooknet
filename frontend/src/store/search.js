const SET_SEARCH_RESULTS = 'search/SET_SEARCH_RESULTS';

const setSearchResults = (results) => ({
    type: SET_SEARCH_RESULTS,
    results
});

export const fetchSearchResults = (type, query) => async (dispatch) => {
    const response = await fetch(`/api/search?type=${type}&query=${query}/`);

    if (response.ok) {
        const results = await response.json();
        dispatch(setSearchResults(results));
    }
};

const initialState = { allResults: [] };

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                allResults: action.results
            };
        default:
            return state;
    }
};

export default searchReducer;
