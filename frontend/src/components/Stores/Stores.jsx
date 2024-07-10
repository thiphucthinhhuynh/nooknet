import './Stores.css';
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStores } from '../../store/userStore.js';

const Stores = () => {
    const dispatch = useDispatch();
    const stores = useSelector((state) => state.userStoreState.allStores);
    const defaultProfilePic = "https://i.imghippo.com/files/YShri1720077342.jpg";

    useEffect(() => {
        dispatch(fetchAllStores());
    }, [dispatch]);

    return (
        <div className="stores-page">

            {stores.map((store) => (
                <span key={store.id} className="store-tile">
                    <Link to={`/stores/${store.id}`} >
                        <div>{store.name}</div>
                        <img src={store.Owner?.profilePic ? store.Owner.profilePic : defaultProfilePic} alt={`${store.username}'s Profile Picture`} className="profile-pic" />
                        <div>{store.Owner?.username}</div>
                        <div><FaLocationDot style={{ color: '#FC3A90' }} /> {store.location}</div>
                    </Link>
                </span>
            ))
            }
        </div >
    );
};

export default Stores;
