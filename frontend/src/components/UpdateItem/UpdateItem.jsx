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
            <form className="update-item-form" onSubmit={handleSubmit} >

                <div id="header">
                    <label>Item you&apos;re offering</label>
                    <input
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Description</label>
                    <textarea
                        name="description"
                        placeholder="Description"
                        rows="5"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div id="body">
                    <label>Pricing</label>
                    <input
                        name="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <label>Amount</label>
                    <input
                        name="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    <label>Category</label>
                    <select
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="" disabled>Select a Category</option>
                        <option value="weapons">Weapons</option>
                        <option value="food">Food</option>
                        <option value="potions">Potions</option>
                        <option value="armors">Armor</option>
                        <option value="accessories">Accessories</option>
                        <option value="tools">Tools</option>
                    </select>
                </div>

                <div id="button">
                    <button id="cancel" type="button" onClick={onCancel}>Cancel</button>
                    <button id="update-item" type="submit" disabled={Object.values(validationErrors).length}>Update Now</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateItem;
