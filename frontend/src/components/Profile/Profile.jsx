import './Profile.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreByCurrentUser } from '../../store/userStore.js';
import { getItemsByStore } from '../../store/item.js';


const Profile = () => {
    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.userStoreState.allStores);
    const sessionUser = useSelector((state) => state.session.user);
    const items = useSelector((state) => state.itemState.allItems);

    useEffect(() => {
        dispatch(getStoreByCurrentUser());
        dispatch(getItemsByStore(userStore.id));
    }, [dispatch]);

    return (
        <div>
            <h1>Hi from Profile</h1>

            <div className="profile-section">
                <div>{sessionUser.username}</div>
            </div>

            <div className="store-section">
                <div>{userStore.name}</div>
                <div>{userStore.location}</div>
                <div>{userStore.description}</div>
            </div>

            <div className="item-section">
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
        </div>
    );
};

export default Profile;
