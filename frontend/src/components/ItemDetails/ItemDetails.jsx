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
    const defaultItemPic = "https://i.imghippo.com/files/WF7he1720243556.png";

    useEffect(() => {
        dispatch(fetchItemDetails(itemId))
            .then(() => { setIsLoaded(true) });
    }, [dispatch, itemId]);

    return (
        isLoaded &&
        <div className="item-details-container">
            <img
                src={Array.isArray(item.ItemImages) && item.ItemImages.length > 0
                    ? item.ItemImages[0].url
                    : defaultItemPic}
                className="item-pic"
            />

            <div>
                <div>{item.name}</div>
                <div>{item.category}</div>
                <div>{item.description}</div>
                <div>{item.price}</div>
                <div>{item.quantity}</div>
            </div>
        </div>
    );
};

export default ItemDetails;
