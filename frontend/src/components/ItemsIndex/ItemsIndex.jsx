import './ItemsIndex.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllItems } from '../../store/item.js';

const ItemsIndex = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.itemState.allItems);

    useEffect(() => {
        dispatch(fetchAllItems());
    }, [dispatch]);

    return (
        <div className="items-index-page">

            {items.map((item) => (
                <span key={item.id} >
                    <Link to={`/items/${item.id}`} className="item-tile">
                        <div>{item.name}</div>
                        <div>{item.category}</div>
                        <div>{item.price}</div>
                    </Link>
                </span>
            ))}
        </div>
    );
};

export default ItemsIndex;
