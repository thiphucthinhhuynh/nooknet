import './ItemDetails.css';
import BearCoin from '../BearCoin';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchItemDetails } from '../../store/item.js';
import LikeButton from '../LikeButton';
import { fetchItemLikes, likeItem, unlikeItem } from '../../store/like.js';


const ItemDetails = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const item = useSelector((state) => state.itemState.itemDetails);
    const defaultItemPic = "https://i.imghippo.com/files/WF7he1720243556.png";
    const sessionUser = useSelector((state) => state.session.user);
    const likes = useSelector((state) => state.likeState.likes);

    useEffect(() => {
        dispatch(fetchItemDetails(itemId))
            .then(() => { setIsLoaded(true) });
    }, [dispatch, itemId]);

    useEffect(() => {
        dispatch(fetchItemLikes(itemId));
    }, [dispatch, itemId]);

    const handleLike = () => {
        dispatch(likeItem(itemId))
            .then(() => dispatch(fetchItemLikes(itemId)));
    };

    const handleUnlike = (likeId) => {
        dispatch(unlikeItem(likeId))
            .then(() => dispatch(fetchItemLikes(itemId)));
    };

    const userHasLiked = likes.some((like) => like.userId === sessionUser.id);

    return (
        isLoaded &&
        <div className="item-details-container">
            <img
                src={Array.isArray(item.ItemImages) && item.ItemImages.length > 0
                    ? item.ItemImages[0].url
                    : defaultItemPic}
                className="item-pic"
            />

            <div id="item-info">
                <div>{item.name}</div>
                <div>{item.category}</div>
                <div>{item.description}</div>
                <div>{item.price == 1 ? <div>1<BearCoin />coin</div> : <div>{item.price}<BearCoin />coins</div>}</div>
                <div>Quantity: {item.quantity}</div>
            </div>

            <div className="like-container">
                <LikeButton
                    userHasLiked={userHasLiked}
                    handleLike={handleLike}
                    handleUnlike={() => handleUnlike(likes.find((like) => like.userId === sessionUser.id).id)}
                />
                <p className="like-count-container">{likes.length} {likes.length == 1 ? 'Like' : 'Likes'}</p>
                <ul>{likes.map((like) => (
                    <li key={like.id}>{like.User?.username}</li>
                ))}
                </ul>
            </div>
        </div>
    );
};

export default ItemDetails;
