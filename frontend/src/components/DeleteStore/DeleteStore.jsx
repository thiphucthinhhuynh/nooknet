import './DeleteStore.css';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteStore, getStoreByCurrentUser } from '../../store/userStore.js';

const DeleteStore = ({ storeId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteStore(storeId));
        await dispatch(getStoreByCurrentUser());

        closeModal();
    };

    return (
        <div className="delete-store-container">
            <p>Are you sure you want to delete your store?</p>
            <p>Delete your store will also remove all of your items</p>
            <div>
                <button id="keep-store" onClick={closeModal}>Cancel</button>
                <button id="delete-store" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default DeleteStore;
