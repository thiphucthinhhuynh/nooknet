import './Profile.css';
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
        <div className="profile-page">

            <div className="profile-section">
                <div>{sessionUser.username}</div>
            </div>

            {userStore ?
                <>
                    <div className="store-section">
                        <OpenModalMenuItem itemText="Update Store" modalComponent={<UpdateStore storeId={userStore.id} sessionUser={sessionUser} userStore={userStore} />} />
                        <OpenModalMenuItem itemText="Delete Store" modalComponent={<DeleteStore storeId={userStore.id} />} />

                        <div>{userStore.name}</div>
                        <div>{userStore.location}</div>
                        <div>{userStore.description}</div>
                    </div>

                    <div className="item-section">
                        <Link to={`/stores/${userStore.id}/create-item`}>Add Listing</Link>

                        {items.map((item) => (
                            <span key={item.id}>

                                {updatingItemId === item.id ? (
                                    <div ref={updateItemRef}>
                                        <UpdateItem item={item} onCancel={handleCancelUpdateItem} />
                                    </div>
                                ) : (<>
                                    <Link to={`/items/${item.id}`}>
                                        <div>{item.name}</div>
                                        <div>{item.category}</div>
                                        <div>{item.price}</div>
                                    </Link>

                                    <div onClick={() => handleUpdateItemClick(item.id)}>Update Item</div>
                                    <OpenModalMenuItem itemText="Delete Item" modalComponent={<DeleteItem item={item} storeId={userStore.id} />} />
                                </>)}

                            </span>
                        ))}
                    </div>
                </>
                : (<OpenModalMenuItem itemText="Create a Store" modalComponent={<CreateStore />} />)
            }
        </div>
    );
};

export default Profile;
