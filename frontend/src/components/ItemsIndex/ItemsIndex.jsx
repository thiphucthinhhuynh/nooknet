import './ItemsIndex.css';
import { useState, useEffect } from 'react';
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
            {items.map((item) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>{item.category}</p>
                    <p>{item.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ItemsIndex;
