import './ProfileItemTiles.css';
import BearCoin from '../BearCoin';
import { Link, useOutletContext } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import UpdateItem from '../UpdateItem';
import DeleteItem from '../DeleteItem';

const ItemTiles = () => {
    const defaultItemPic = "https://i.imghippo.com/files/WF7he1720243556.png";
    const { userStore, items } = useOutletContext();

    const [updatingItemId, setUpdatingItemId] = useState(null);
    const updateItemRef = useRef(null); // Ref for the UpdateItem component

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
        <div className="item-section">
            {/* <Link to={`/stores/${userStore.id}/create-item`} className="create-item-button"><HiMiniPencilSquare className="pencil-icon" /> Add Listing</Link> */}

            {items.map((item) => (
                <span key={item.id}>

                    {updatingItemId === item.id ?
                        (
                            <div ref={updateItemRef}>
                                <UpdateItem item={item} onCancel={handleCancelUpdateItem} storeId={userStore.id} />
                            </div>
                        ) :
                        (
                            <div id="item-tile">
                                <Link to={`/items/${item.id}`} className="item-info">
                                    {/* <img src={item.ItemImages[0]?.url ? item.ItemImages[0]?.url : defaultItemPic} className="item-pic" /> */}
                                    <img
                                        src={Array.isArray(item.ItemImages) && item.ItemImages.length > 0
                                            ? item.ItemImages[0].url
                                            : defaultItemPic}
                                        className="item-pic"
                                    />

                                    <div>
                                        <div id="item-name">{item.name}</div>
                                        <div>{item.category}</div>
                                        <div>{item.price == 1 ? <div>1<BearCoin />coin</div> : <div>{item.price}<BearCoin />coins</div>}</div>
                                    </div>
                                </Link>

                                <div>
                                    <div className="update-item-button" onClick={() => handleUpdateItemClick(item.id)}>Update Item</div>
                                    <div className="delete-item-button"><OpenModalMenuItem itemText="Delete Item" modalComponent={<DeleteItem item={item} storeId={userStore.id} />} /></div>
                                </div>
                            </div>
                        )
                    }
                </span>
            ))}
        </div>
    );
}
export default ItemTiles;
