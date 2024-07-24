import './FollowButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unfollow, fetchFollowers } from '../../store/follow.js';

const FollowButton = ({ senderId, receiverId }) => {
    const dispatch = useDispatch();
    const followers = useSelector(state => state.followState.followers);

    // Check if the Current User is following the Receiver
    const isFollowing = followers.some(follower => follower.senderId === senderId);

    const handleFollow = async () => {
        await dispatch(follow(senderId, receiverId));
        await dispatch(fetchFollowers(receiverId));
    };

    const handleUnfollow = async () => {
        await dispatch(unfollow(senderId, receiverId));
        await dispatch(fetchFollowers(receiverId));
    };

    return (
        <div className="follow">
            {isFollowing ? (
                <button onClick={handleUnfollow} id="unfollow">Unfollow</button>
            ) : (
                <button onClick={handleFollow} id="follow">Follow</button>
            )}
        </div>
    );
};

export default FollowButton;
