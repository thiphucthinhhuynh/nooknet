import './Profile.css';
import { FaLocationDot } from "react-icons/fa6";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreByCurrentUser } from '../../store/userStore.js';
import { getItemsByStore } from '../../store/item.js';
import CreateStore from '../CreateStore';
import UpdateStore from '../UpdateStore';
import DeleteStore from '../DeleteStore';
import ProfileNavBar from '../ProfileNavBar';


const Profile = () => {
    const defaultProfilePic = "https://i.imghippo.com/files/YShri1720077342.jpg";
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userStore = useSelector((state) => state.userStoreState.currentStore);
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
        userStore ?
            <div className="profile-page">
                <div className="store-section">
                    <div id="store-stat">
                        <img src={userStore.Owner?.profilePic ? userStore.Owner.profilePic : defaultProfilePic} alt={`${sessionUser.username}'s Profile Picture`} className="profile-pic" />
                        <div>{sessionUser.username}</div>
                    </div>

                    <div id="store-info">
                        <div>
                            <div>{userStore.name}</div>
                            <div className="update-button"><OpenModalMenuItem itemText="Update Store" modalComponent={<UpdateStore storeId={userStore.id} sessionUser={sessionUser} userStore={userStore} />} /></div>
                            <div className="delete-button"><OpenModalMenuItem itemText="Delete Store" modalComponent={<DeleteStore storeId={userStore.id} />} /></div>
                        </div>
                        {userStore.location && <div><FaLocationDot style={{ color: '#FC3A90' }} /> {userStore.location}</div>}
                        <div className="bubble-container">{userStore.description ? userStore.description : `Welcome to ${userStore.name}!~~`}</div>
                    </div>
                </div>

                <ProfileNavBar />
                <Outlet context={{ items, userStore, sessionUser }} />

            </div>
            : (<div className="create-store-button"><OpenModalMenuItem itemText="Create a Store" modalComponent={<CreateStore />} /></div>)
    );
};

export default Profile;
