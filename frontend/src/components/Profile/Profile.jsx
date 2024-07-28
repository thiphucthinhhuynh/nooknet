import './Profile.css';
import { FaLocationDot } from "react-icons/fa6";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { Outlet } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreByCurrentUser } from '../../store/userStore.js';
import { getItemsByStore } from '../../store/item.js';
import CreateStore from '../CreateStore';
import UpdateStore from '../UpdateStore';
import DeleteStore from '../DeleteStore';
import ProfileNavBar from '../ProfileNavBar';
import { fetchFollowers, fetchFollowees } from '../../store/follow.js';


const Profile = () => {
    const [showFollower, setShowFollower] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const defaultProfilePic = "https://i.imghippo.com/files/YShri1720077342.jpg";
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userStore = useSelector((state) => state.userStoreState.currentStore);
    const items = useSelector((state) => state.itemState.allItems);
    const followers = useSelector((state) => state.followState.followers);
    const followees = useSelector((state) => state.followState.followees);

    useEffect(() => {
        dispatch(getStoreByCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        if (userStore && userStore.id) {
            dispatch(getItemsByStore(userStore.id));
        }
    }, [dispatch, userStore, userStore.id]);

    useEffect(() => {
        dispatch(fetchFollowers(userStore.id));
        dispatch(fetchFollowees(userStore.id));
    }, [dispatch, userStore.id]);

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

    return (
        userStore ?
            <div className="profile-page">
                <div className="store-section">
                    <div id="store-stat">
                        <img src={userStore.Owner?.profilePic ? userStore.Owner.profilePic : defaultProfilePic} alt={`${sessionUser.username}'s Profile Picture`} className="profile-pic" />
                        <div id="username">{sessionUser.username}</div>

                        <div id="follow-section">
                            {/* {sessionUser && <FollowButton senderId={sessionUser.id} receiverId={store.Owner.id} />} */}
                            <div id="follower" ref={followerRef}>
                                <p onClick={handleToggleFollower}>{followers.length} Followers</p>
                                {showFollower &&
                                    <ul>
                                        <li style={{ fontWeight: 'bold' }}>Followers</li>
                                        {followers.map(follower => (
                                            <li key={follower.id}>{follower.Sender?.username}</li>
                                        ))}
                                    </ul>}
                            </div>
                            <div id="following" ref={followingRef}>
                                <p onClick={handleToggleFollowing}>{followees.length} Following</p>
                                {showFollowing &&
                                    <ul>
                                        <li style={{ fontWeight: 'bold' }}>Following</li>
                                        {followees.map(followee => (
                                            <li key={followee.id}>{followee.Receiver?.username}</li>
                                        ))}
                                    </ul>}
                            </div>
                        </div>

                    </div>

                    <div id="store-info">
                        <div>
                            <div id="name">{userStore.name}</div>
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
