import './Profile.css';
// import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaNewspaper } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { getStoreByCurrentUser } from '../../store/userStore.js';
import { getItemsByStore } from '../../store/item.js';
import CreateStore from '../CreateStore';
import UpdateStore from '../UpdateStore';
import DeleteStore from '../DeleteStore';
import UpdateItem from '../UpdateItem';
import DeleteItem from '../DeleteItem';


const Profile = () => {
    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.userStoreState.currentStore);
    const sessionUser = useSelector((state) => state.session.user);
    const items = useSelector((state) => state.itemState.allItems);
    const defaultProfilePic = "https://i.imghippo.com/files/YShri1720077342.jpg";
    const defaultItemPic = "https://i.imghippo.com/files/WF7he1720243556.png";

    const [updatingItemId, setUpdatingItemId] = useState(null);
    const updateItemRef = useRef(null); // Ref for the UpdateItem component

    useEffect(() => {
        dispatch(getStoreByCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        if (userStore && userStore.id) {
            dispatch(getItemsByStore(userStore.id));
        }
    }, [dispatch, userStore]);

    const handleUpdateItemClick = (itemId) => {
        setUpdatingItemId(itemId);
    };

    const handleCancelUpdateItem = () => {
        setUpdatingItemId(null);
    };

    // Detect clicks outside the UpdateItem component
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (updateItemRef.current && !updateItemRef.current.contains(event.target)) {
                setUpdatingItemId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [updateItemRef]);


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
                        <div><FaLocationDot style={{ color: '#FC3A90' }} /> {userStore.location}</div>
                        <div className="bubble-container">{userStore.description}</div>
                    </div>
                </div>

                <div className="newspaper" ><FaNewspaper id="icon" /> Listings</div>
                <div className="item-section">
                    {/* <Link to={`/stores/${userStore.id}/create-item`} className="create-item-button"><HiMiniPencilSquare className="pencil-icon" /> Add Listing</Link> */}

                    {items.map((item) => (
                        <span key={item.id}>

                            {updatingItemId === item.id ?
                                (
                                    <div ref={updateItemRef}>
                                        <UpdateItem item={item} onCancel={handleCancelUpdateItem} />
                                    </div>
                                ) :
                                (

                                    <div id="item-tile">
                                        <Link to={`/items/${item.id}`} className="item-info">
                                            <img src={item.ItemImages[0].url ? item.ItemImages[0].url : defaultItemPic} className="item-pic" />

                                            <div>
                                                <div>{item.name}</div>
                                                <div>{item.category}</div>
                                                <div>{item.price}</div>
                                            </div>
                                        </Link>

                                        <div>
                                            <div className="update-item-button" onClick={() => handleUpdateItemClick(item.id)}>Update Item</div>
                                            <div className="delete-item-button"><OpenModalMenuItem itemText="Delete Item" modalComponent={<DeleteItem item={item} storeId={userStore.id} />} /></div>
                                        </div>
                                    </div>

                                )}

                        </span>
                    ))}
                </div>
            </div>
            : (<div className="create-store-button"><OpenModalMenuItem itemText="Create a Store" modalComponent={<CreateStore />} /></div>)
    );
};

export default Profile;
