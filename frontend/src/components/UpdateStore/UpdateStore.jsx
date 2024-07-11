import './UpdateStore.css';
import { useModal } from '../../context/Modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStore, getStoreByCurrentUser } from '../../store/userStore.js';

const UpdateStore = ({ storeId, sessionUser, userStore }) => {
    const [name, setName] = useState(userStore.name);
    const [description, setDescription] = useState(userStore.description);
    const [location, setLocation] = useState(userStore.location);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const isFormInvalid = !name;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedName = name.trim();
        const trimmedDescription = description.trim();
        const trimmedLocation = location.trim();

        const validationErrors = {};

        if (!trimmedName) {
            validationErrors.name = "Store name cannot be empty, or contain only spaces";
        }

        if (description && !trimmedDescription) {
            validationErrors.description = "Description cannot contain only spaces";
        }

        if (location && !trimmedLocation) {
            validationErrors.location = "Location cannot contain only spaces";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const updatedStoreData = {
            ownerId: sessionUser.id,
            name: trimmedName,
            description: trimmedDescription,
            location: trimmedLocation
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
                    required
                />
                {errors.name && <p className="errors">{errors.name}</p>}

                <textarea
                    name="description"
                    placeholder="Description (Optional)"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {errors.description && <p className="errors">{errors.description}</p>}

                <input
                    name="location"
                    placeholder="Location (Optional)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                {errors.location && <p className="errors">{errors.location}</p>}

                <div>
                    <button id="cancel" type="button" onClick={closeModal}>Close</button>
                    <button id="update-store" type="submit" disabled={isFormInvalid}>Save</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateStore;
