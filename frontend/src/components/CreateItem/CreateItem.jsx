import './CreateItem.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNewItem } from '../../store/item.js';

const CreateItem = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const { storeId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            errors.category = "Please enter a category."
        }

        setValidationErrors(errors);
    }, [name, description, price, quantity, category]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newItemData = {
            storeId,
            name,
            description,
            price,
            quantity,
            category
        };

        const newItem = await dispatch(createNewItem(newItemData, storeId));

        if (newItem) {
            navigate(`/items/${newItem.id}`);
        }

    };

    return (
        <div className="create-item-container">
            <form className="create-item-form" onSubmit={handleSubmit} >
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
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

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

                <div>
                    <button id="cancel" type="button" onClick={() => navigate('/profile')}>Cancel</button>
                    <button id="create-item" type="submit" disabled={Object.values(validationErrors).length}>Create Now</button>
                </div>
            </form>

        </div>
    );
};

export default CreateItem;
