import './FollowButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unfollow, fetchFollowees } from '../../store/follow.js';

const FollowButton = ({ receiverId }) => {
    const dispatch = useDispatch();
    const followees = useSelector(state => state.followState.followees);
    const isFollowing = followees.some(followee => followee.receiverId === receiverId);
    const sessionUser = useSelector(state => state.session.user);

    const handleFollow = async () => {
        await dispatch(follow(sessionUser.id, receiverId));
        await dispatch(fetchFollowees(sessionUser.id));
    };

    const handleUnfollow = async () => {
        await dispatch(unfollow(sessionUser.id, receiverId));
        await dispatch(fetchFollowees(sessionUser.id));
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
