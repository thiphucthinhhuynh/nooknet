import './ItemDetails.css';
import BearCoin from '../BearCoin';
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

            <div id="item-info">
                <div>{item.name}</div>
                <div>{item.category}</div>
                <div>{item.description}</div>
                <div>{item.price == 1 ? <div>1<BearCoin />coin</div> : <div>{item.price}<BearCoin />coins</div>}</div>
                <div>Type of Item Price: {typeof item.price}</div>
                <div>Quantity: {item.quantity}</div>
            </div>
        </div>
    );
};

export default ItemDetails;
