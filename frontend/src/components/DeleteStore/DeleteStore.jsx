import './DeleteStore.css';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteStore } from '../../store/userStore.js';

const DeleteStore = ({ storeId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteStore(storeId))

        closeModal();
    };

    return (
        <div className="delete-store-modal">
            <h1>Are you sure you want to delete your store?</h1>
            <div className="delete-store-btn-container">
                <button id="keep-store" onClick={closeModal}>Cancel</button>
                <button id="delete-store" onClick={handleDelete}>OK</button>
            </div>
        </div>
    );
};

export default DeleteStore;
