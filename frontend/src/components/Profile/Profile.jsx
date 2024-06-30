import './Profile.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { getStoreByCurrentUser } from '../../store/userStore.js';
import { getItemsByStore } from '../../store/item.js';
import UpdateStore from '../UpdateStore';
import CreateStore from '../CreateStore';
import DeleteStore from '../DeleteStore';


const Profile = () => {
    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.userStoreState.currentStore);
    const sessionUser = useSelector((state) => state.session.user);
    const items = useSelector((state) => state.itemState.allItems);

    useEffect(() => {
        dispatch(getStoreByCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        if (userStore && userStore.id) {
            dispatch(getItemsByStore(userStore.id));
        }
    }, [dispatch, userStore]);

    return (
        <div className="profile-page">
            <h1>Hi from Profile</h1>

            <div className="profile-section">
                <div>{sessionUser.username}</div>
            </div>

            {userStore ?
                <>
                    <div className="store-section">
                        <OpenModalMenuItem itemText="Update Store" modalComponent={<UpdateStore storeId={userStore.id} sessionUser={sessionUser} userStore={userStore} />} />
                        <OpenModalMenuItem itemText="Delete Store" modalComponent={<DeleteStore storeId={userStore.id} />} />

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
                : (<OpenModalMenuItem itemText="Create a Store" modalComponent={<CreateStore />} />)
            }
        </div>
    );
};

export default Profile;
