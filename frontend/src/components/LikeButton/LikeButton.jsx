import './LikeButton.css';
import { useState } from 'react';
import { GoHeartFill, GoHeart } from 'react-icons/go';
import { BiSolidLeaf } from 'react-icons/bi';

const LikeButton = ({ userHasLiked, handleLike, handleUnlike }) => {
    const [animate, setAnimate] = useState(false);

    const handleLikeClick = () => {
        setAnimate(true);
        handleLike();
        setTimeout(() => { setAnimate(false) }, 1000); // Reset animation after 1 second
    };

    const handleUnlikeClick = () => {
        handleUnlike();
    };

    return (
        <div className="like-button">
            {userHasLiked ? (
                <GoHeartFill onClick={handleUnlikeClick} id="filled-heart" />
            ) : (
                <GoHeart onClick={handleLikeClick} id="empty-heart" />
            )}
            {animate && <BiSolidLeaf className="leaf-animation" />}
        </div>
    );
};

export default LikeButton;
