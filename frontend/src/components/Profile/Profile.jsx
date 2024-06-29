import './Profile.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreByCurrentUser } from '../../store/userStore.js';
import { getItemsByStore } from '../../store/item.js';
import CreateStore from '../CreateStore';


const Profile = () => {
    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.userStoreState.allStores.length > 0 ? state.userStoreState.allStores[0] : null);
    const sessionUser = useSelector((state) => state.session.user);
    const items = useSelector((state) => state.itemState.allItems);

    const [showCreateStore, setShowCreateStore] = useState(false);

    const handleCreateStoreClick = () => {
        setShowCreateStore(true);
    };

    useEffect(() => {
        dispatch(getStoreByCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        if (userStore && userStore.id) {
            dispatch(getItemsByStore(userStore.id));
        }
    }, [dispatch, userStore]);

    return (
        <div>
            <h1>Hi from Profile</h1>

            <div className="profile-section">
                <div>{sessionUser.username}</div>
            </div>

            {userStore ?
                <>
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
                </>
                : (!showCreateStore ? <div onClick={handleCreateStoreClick}>Create a Store </div> : <CreateStore />)
            }
        </div>
    );
};

export default Profile;
