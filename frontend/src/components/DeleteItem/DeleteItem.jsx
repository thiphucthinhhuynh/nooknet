import './DeleteItem.css';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteItem, getItemsByStore } from '../../store/item.js';


const DeleteItem = ({ item, storeId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const defaultItemPic = "https://i.imghippo.com/files/WF7he1720243556.png";

    const handleDeleteItem = async () => {
        await dispatch(deleteItem(item.id));
        await dispatch(getItemsByStore(storeId));

        closeModal();
    };

    return (
        <div className="delete-item-container">
            <p>Are you sure you want to delete this item?</p>

            <div id="body">
                {/* <img src={item.ItemImages[0]?.url ? item.ItemImages[0]?.url : defaultItemPic} className="item-pic" /> */}
                <img
                    src={Array.isArray(item.ItemImages) && item.ItemImages.length > 0
                        ? item.ItemImages[0].url
                        : defaultItemPic}
                    className="item-pic"
                />
                <div>
                    <div className="item-name">{item.name}</div>
                    <div>{item.category}</div>
                    <div>{item.price}</div>
                </div>
            </div>

            <div>
                <button id="keep-item" onClick={closeModal}>Keep Item</button>
                <button id="delete-item" onClick={handleDeleteItem}>Delete Item</button>
            </div>
        </div>
    );
};

export default DeleteItem;
