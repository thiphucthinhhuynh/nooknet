import './StoreDetails.css';
import BearCoin from '../BearCoin';
import { FaNewspaper } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchStoreDetails } from '../../store/userStore.js';
import { getItemsByStore } from '../../store/item.js';

const StoreDetails = () => {
    const { storeId } = useParams();
    const dispatch = useDispatch();
    const store = useSelector((state) => state.userStoreState.storeDetails);
    const items = useSelector((state) => state.itemState.allItems);
    const defaultProfilePic = "https://i.imghippo.com/files/YShri1720077342.jpg";
    const defaultItemPic = "https://i.imghippo.com/files/WF7he1720243556.png";

    useEffect(() => {
        dispatch(fetchStoreDetails(storeId));
    }, [dispatch, storeId]);

    useEffect(() => {
        if (store && store.id) {
            dispatch(getItemsByStore(store.id));
        }
    }, [dispatch, store]);

    if (!store) {
        return <div>Loading...</div>;
    }

    return (
        <div className="store-details">
            <div className="store-section">
                <div id="store-stat">
                    <img src={store.Owner?.profilePic ? store.Owner.profilePic : defaultProfilePic} alt={`${store.username}'s Profile Picture`} className="profile-pic" />
                    <div>{store.Owner?.username}</div>
                </div>

                <div id="store-info">
                    <div>{store.name}</div>
                    {store.location && <div><FaLocationDot style={{ color: '#FC3A90' }} /> {store.location}</div>}
                    <div className="bubble-container">{store.description ? store.description : `Welcome to ${store.name}!~~`}</div>
                </div>
            </div>

            <div className="newspaper" ><FaNewspaper id="icon" /> Listings</div>
            <div className="item-section">
                {items.map((item) => (
                    <span key={item.id}>
                        <div id="item-tile">
                            <Link to={`/items/${item.id}`} className="item-info">
                                <img
                                    src={Array.isArray(item.ItemImages) && item.ItemImages.length > 0
                                        ? item.ItemImages[0].url
                                        : defaultItemPic}
                                    className="item-pic"
                                />

                                <div>
                                    <div>{item.name}</div>
                                    <div>{item.category}</div>
                                    <div>{item.price === 1 ? '1 Bear coin' : <div>{item.price}<BearCoin />coins</div>}</div>
                                </div>
                            </Link>
                        </div>
                    </span>
                ))}
            </div>

        </div>
    );
};

export default StoreDetails;
