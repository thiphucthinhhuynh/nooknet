import './DeleteItem.css';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteItem, getItemsByStore } from '../../store/item.js';


const DeleteItem = ({ item, storeId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDeleteItem = async () => {
        await dispatch(deleteItem(item.id));
        await dispatch(getItemsByStore(storeId));

        closeModal();
    };

    return (
        <div>
            <h1>Are you sure you want to delete this item?</h1>

            <div>
                <div>{item.name}</div>
                <div>{item.category}</div>
                <div>{item.price}</div>
            </div>

            <button onClick={closeModal}>Keep Item</button>
            <button onClick={handleDeleteItem}>Delete Item</button>
        </div>
    );
};

export default DeleteItem;
