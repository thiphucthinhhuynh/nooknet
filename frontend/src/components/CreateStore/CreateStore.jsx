import './CreateStore.css';
import { useModal } from '../../context/Modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewStore, getStoreByCurrentUser } from '../../store/userStore.js';

const CreateStore = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);

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

        const newStoreData = {
            ownerId: sessionUser.id,
            name: trimmedName,
            description: trimmedDescription,
            location: trimmedLocation
        };

        const newStore = await dispatch(createNewStore(newStoreData));

        if (newStore) {
            await dispatch(getStoreByCurrentUser());
        }

        closeModal();
    };

    return (
        <div className="create-store-container">
            <p>Create a New Store</p>
            <form onSubmit={handleSubmit} className="create-store-form">
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
                    <button id="cancel" type="button" onClick={closeModal}>Cancel</button>
                    <button id="create-store" type="submit" disabled={isFormInvalid}>Create Your Store</button>
                </div>
            </form>
        </div>
    );
};

export default CreateStore;
