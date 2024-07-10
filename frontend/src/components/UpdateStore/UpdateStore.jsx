import './UpdateStore.css';
import { useModal } from '../../context/Modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStore, getStoreByCurrentUser } from '../../store/userStore.js';

const UpdateStore = ({ storeId, sessionUser, userStore }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const [name, setName] = useState(userStore.name);
    const [description, setDescription] = useState(userStore.description);
    const [location, setLocation] = useState(userStore.location);

    const isFormInvalid = !name || !location;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedStoreData = {
            ownerId: sessionUser.id,
            name,
            description,
            location
        };

        const updatedStore = await dispatch(updateStore(updatedStoreData, storeId));

        if (updatedStore) {
            await dispatch(getStoreByCurrentUser())
        }

        closeModal();
    };

    return (
        <div className="update-store-container">
            <p>Update Your Store</p>
            <form onSubmit={handleSubmit} className="update-store-form">
                <input
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <input
                    name="location"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <div>
                    <button id="cancel" type="button" onClick={closeModal}>Close</button>
                    <button id="update-store" type="submit" disabled={isFormInvalid}>Save</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateStore;
