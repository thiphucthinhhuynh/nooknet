import './StoreDetails.css';
import { FaLocationDot } from "react-icons/fa6";
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchStoreDetails } from '../../store/userStore.js';
import { getItemsByStore } from '../../store/item.js';
import FollowButton from '../FollowButton';
import { fetchFollowers, fetchFollowees } from '../../store/follow.js';
import ProfileNavBar from '../ProfileNavBar';


const StoreDetails = () => {
    const { storeId } = useParams();
    const dispatch = useDispatch();
    const store = useSelector((state) => state.userStoreState.storeDetails);
    const items = useSelector((state) => state.itemState.allItems);
    const defaultProfilePic = "https://i.imghippo.com/files/YShri1720077342.jpg";
    const sessionUser = useSelector(state => state.session.user);
    const followers = useSelector(state => state.followState.followers);
    const followees = useSelector(state => state.followState.followees);

    useEffect(() => {
        dispatch(fetchStoreDetails(storeId));
    }, [dispatch, storeId]);

    useEffect(() => {
        if (store && store.id) {
            dispatch(getItemsByStore(store.id));
        }
    }, [dispatch, store]);

    useEffect(() => {
        if (store && store.Owner) {
            dispatch(fetchFollowers(store.Owner.id));
            dispatch(fetchFollowees(store.Owner.id));
        }
    }, [dispatch, store]);

    if (!store) {
        return <div>Loading...</div>;
    }

    return (
        <div className="store-details">

            <div className="follow-section">
                <FollowButton senderId={sessionUser.id} receiverId={store.Owner.id} />
                <div>
                    <p>Followers</p>
                    <ul>
                        {followers.map(follower => (
                            <li key={follower.id}>{follower.Sender?.username}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p>Following</p>
                    <ul>
                        {followees.map(followee => (
                            <li key={followee.id}>{followee.Receiver?.username}</li>
                        ))}
                    </ul>
                </div>
            </div>

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

            <ProfileNavBar />
            <Outlet context={{ items }} />

        </div>
    );
};

export default StoreDetails;
