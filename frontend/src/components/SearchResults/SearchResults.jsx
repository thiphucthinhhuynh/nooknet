import './SearchResults.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchSearchResults } from '../../store/search.js';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.searchState.allResults);
    const type = useQuery().get('type');
    const query = useQuery().get('query');

    useEffect(() => {
        if (type && query) {
            dispatch(fetchSearchResults(type, query));
        }
    }, [dispatch, type, query]);

    return (
        <div>
            {type === 'items' ? (
                searchResults.map((result) => (
                    <div key={result.id}>{result.name}</div>
                ))
            ) : (
                searchResults.map((result) => (
                    <div key={result.id}>{result.username}</div>
                ))
            )}
        </div>
    );
};

export default SearchResults;
