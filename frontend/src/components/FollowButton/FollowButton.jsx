import './FollowButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unfollow, fetchFollowers } from '../../store/follow.js';

const FollowButton = ({ receiverId }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const followers = useSelector(state => state.followState.followers);

    // Check if the Current User is following the Receiver
    const isFollowing = followers.some(follower => follower.senderId === sessionUser.id);

    const handleFollow = async () => {
        await dispatch(follow(sessionUser.id, receiverId));
        await dispatch(fetchFollowers(receiverId));
    };

    const handleUnfollow = async () => {
        await dispatch(unfollow(sessionUser.id, receiverId));
        await dispatch(fetchFollowers(receiverId));
    };

    return (
        <div className="follow-button">
            {isFollowing ? (
                <div onClick={handleUnfollow} id="unfollow">Unfollow</div>
            ) : (
                <div onClick={handleFollow} id="follow">Follow</div>
            )}
        </div>
    );
};

export default FollowButton;
