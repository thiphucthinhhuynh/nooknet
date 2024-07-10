import './SearchResults.css';
import BearCoin from '../BearCoin';
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
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
    const defaultItemPic = "https://i.imghippo.com/files/WF7he1720243556.png";
    const defaultProfilePic = "https://i.imghippo.com/files/YShri1720077342.jpg";

    useEffect(() => {
        if (type && query) {
            dispatch(fetchSearchResults(type, query));
        }
    }, [dispatch, type, query]);

    return (
        <div className="results-page">
            {searchResults.length === 0 ? (
                <div>No results could be found</div>
            ) : (
                type === 'items' ? (
                    searchResults.map((result) => (
                        <div key={result.id} >
                            <Link to={`/items/${result.id}`} className="items-index-tile">
                                {/* <img src={result.ItemImages[0]?.url ? result.ItemImages[0].url : defaultItemPic} className="item-pic" /> */}
                                <img
                                    src={Array.isArray(result.ItemImages) && result.ItemImages.length > 0
                                        ? result.ItemImages[0].url
                                        : defaultItemPic}
                                    className="item-pic"
                                />

                                <div>
                                    <div className="item-name">{result.name}</div>
                                    <div>{result.category}</div>
                                    <div>{result.price === 1 ? '1 Bear coin' : <div>{result.price}<BearCoin />coins</div>}</div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    searchResults.map((result) => (
                        <div key={result.id} >
                            <Link to={`/stores/${result.id}`} className="store-tile">
                                <img src={result.profilePic ? result.profilePic : defaultProfilePic} alt={`${result.username}'s Profile Picture`} className="profile-pic" />
                                <div>{result.username}</div>
                                <div><FaLocationDot style={{ color: '#FC3A90' }} /> {result.Stores?.[0]?.location}</div>
                            </Link>
                        </div>
                    ))
                )
            )}
        </div>
    );
};

export default SearchResults;
