import './StoreDetails.css';
import { FaLocationDot } from "react-icons/fa6";
import { Outlet } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchStoreDetails } from '../../store/userStore.js';
import { getItemsByStore } from '../../store/item.js';
import FollowButton from '../FollowButton';
import { fetchFollowers, fetchFollowees } from '../../store/follow.js';
import ProfileNavBar from '../ProfileNavBar';


const StoreDetails = () => {
    const [showFollower, setShowFollower] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const { storeId } = useParams();
    const dispatch = useDispatch();
    const store = useSelector((state) => state.userStoreState.storeDetails);
    const items = useSelector((state) => state.itemState.allItems);
    const defaultProfilePic = "https://i.imghippo.com/files/YShri1720077342.jpg";
    const sessionUser = useSelector(state => state.session.user);
    const followers = useSelector(state => state.followState.followers);
    const followees = useSelector(state => state.followState.followees);
    const isOwner = store?.Owner?.id === sessionUser?.id;

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

    const followerRef = useRef();
    const followingRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (followerRef.current && !followerRef.current.contains(event.target)); {
                setShowFollower(false);
            }
            if (followingRef.current && !followingRef.current.contains(event.target)) {
                setShowFollowing(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => { document.removeEventListener('mousedonw', handleClickOutside) };
    }, []);

    const handleToggleFollower = () => {
        setShowFollower(!showFollower);
        setShowFollowing(false);
    };

    const handleToggleFollowing = () => {
        setShowFollowing(!showFollowing);
        setShowFollower(false);
    };

    if (!store) {
        return <div>Loading...</div>;
    }

    return (
        <div className="store-details">

            <div className="store-section">
                <div id="store-stat">
                    <img src={store.Owner?.profilePic ? store.Owner.profilePic : defaultProfilePic} alt={`${store.username}'s Profile Picture`} className="profile-pic" />
                    <div id="username">{store.Owner?.username}</div>

                    <div id="follow-section">
                        {/* {sessionUser && <FollowButton senderId={sessionUser.id} receiverId={store.Owner.id} />} */}
                        <div id="follower" ref={followerRef}>
                            <p onClick={handleToggleFollower}>{followers.length} Followers</p>
                            {showFollower && <ul>
                                <li style={{ fontWeight: 'bold' }}>Followers</li>
                                {followers.map(follower => (
                                    <li key={follower.id}>{follower.Sender?.username}</li>
                                ))}
                            </ul>}
                        </div>
                        <div id="following" ref={followingRef}>
                            <p onClick={handleToggleFollowing}>{followees.length} Following</p>
                            {showFollowing && <ul>
                                <li style={{ fontWeight: 'bold' }}>Following</li>
                                {followees.map(followee => (
                                    <li key={followee.id}>{followee.Receiver?.username}</li>
                                ))}
                            </ul>}
                        </div>
                    </div>

                </div>

                <div id="store-info">
                    <div id="header">
                        <div id="name">{store.name}</div>
                        {sessionUser && !isOwner && <div><FollowButton senderId={sessionUser.id} receiverId={store.Owner.id} /></div>}
                    </div>
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
