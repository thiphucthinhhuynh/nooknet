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
        <div>
            <h1>Hi from ItemsIndex</h1>
            {items.map((item) => (
                <span key={item.id}>
                    <Link to={`/items/${item.id}`}>
                        <span>{item.name}</span>
                        <span>{item.category}</span>
                        <span>{item.price}</span>
                    </Link>
                </span>
            ))}
        </div>
    );
};

export default ItemsIndex;
