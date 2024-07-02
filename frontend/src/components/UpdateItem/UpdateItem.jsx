import './UpdateItem.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateItem } from '../../store/item.js';

const UpdateItem = ({ item, onCancel }) => {
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [price, setPrice] = useState(item.price);
    const [quantity, setQuantity] = useState(item.quantity);
    const [category, setCategory] = useState(item.category);
    const [validationErrors, setValidationErrors] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        const errors = {};

        if (!name) {
            errors.name = "Please enter a name.";
        }

        if (!description) {
            errors.description = "Please enter description.";
        }

        if (!price) {
            errors.price = "Please enter a price.";
        }

        if (!quantity) {
            errors.quantity = "Please enter quantity.";
        }

        if (!category) {
            errors.category = "Please enter a category.";
        }

        setValidationErrors(errors);
    }, [name, description, price, quantity, category]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedItemData = {
            name,
            description,
            price,
            quantity,
            category
        };

        const updatedItem = await dispatch(updateItem(updatedItemData, item.id));

        if (updatedItem) {
            onCancel();
        }
    };

    return (
        <div className="update-item-container">
            <h1>Hi from UpdateItem</h1>

            <form onSubmit={handleSubmit} className="update-item-form">
                <input
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <input
                    name="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    name="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <input
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <button type="button" onClick={onCancel}>Cancel</button>
                <button type="submit" disabled={Object.values(validationErrors).length}>Update Now</button>
            </form>

        </div>
    );
};

export default UpdateItem;
