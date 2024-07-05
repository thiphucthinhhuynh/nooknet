import './ItemDetails.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchItemDetails } from '../../store/item.js';

const ItemDetails = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const item = useSelector((state) => state.itemState.itemDetails);

    useEffect(() => {
        dispatch(fetchItemDetails(itemId))
            .then(() => { setIsLoaded(true) });
    }, [dispatch, itemId]);

    return (
        isLoaded &&
        <div>

            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>{item.price}</div>
            <div>{item.quantity}</div>
            <div>{item.category}</div>
        </div>
    );
};

export default ItemDetails;
