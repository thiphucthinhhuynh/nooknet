import './Likes.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikedItems } from '../../store/item.js';
import StoreItemTiles from '../StoreItemTiles';

const Likes = () => {
    const dispatch = useDispatch();
    const likedItems = useSelector(state => state.itemState.likedItems);

    useEffect(() => {
        dispatch(fetchLikedItems());
    }, [dispatch]);

    return (
        <div>
            <StoreItemTiles items={likedItems} />
        </div>
    );
};

export default Likes;
