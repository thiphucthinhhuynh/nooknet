import './ItemsIndex.css';
import BearCoin from '../BearCoin';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllItems } from '../../store/item.js';

const ItemsIndex = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.itemState.allItems);
    const defaultItemPic = "https://i.imghippo.com/files/WF7he1720243556.png";

    useEffect(() => {
        dispatch(fetchAllItems());
    }, [dispatch]);

    return (
        <div className="items-index-page">

            {items.map((item) => (
                <span key={item.id} >
                    <Link to={`/items/${item.id}`} className="items-index-tile">
                        <img src={item.ItemImages[0]?.url ? item.ItemImages[0].url : defaultItemPic} className="item-pic" />

                        <div>
                            <div className="item-name">{item.name}</div>
                            <div>{item.category}</div>
                            <div>{item.price === 1 ? <div>1<BearCoin />coin</div> : <div>{item.price}<BearCoin />coins</div>}</div>
                        </div>
                    </Link>
                </span>
            ))}
        </div>
    );
};

export default ItemsIndex;
