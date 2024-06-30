import './UpdateStore.css';
import { useModal } from '../../context/Modal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateStore, getStoreByCurrentUser } from '../../store/userStore.js';

const UpdateStore = ({ storeId, sessionUser, userStore }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const [name, setName] = useState(userStore.name);
    const [description, setDescription] = useState(userStore.description);
    const [location, setLocation] = useState(userStore.location);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const errors = {};

        if (!name) {
            errors.name = "Please enter a name";
        }

        if (!description) {
            errors.description = "Please enter description";
        }

        if (!location) {
            errors.location = "Please enter a location";
        }

        setValidationErrors(errors);
    }, [name, description, location]);

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
            <h1>Hi from UpdateStore</h1>

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

                <button type="button" onClick={closeModal}>Close</button>
                <button type="submit" disabled={Object.values(validationErrors).length}>Save</button>
            </form>
        </div>
    );
};

export default UpdateStore;
