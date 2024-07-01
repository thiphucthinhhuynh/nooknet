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
            <h1>Hi from CreateItem</h1>

            <form onSubmit={handleSubmit} className="create-item-form">
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
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <input
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <button type="button" onClick={() => navigate('/profile')}>❌</button>
                <button type="submit" disabled={Object.values(validationErrors).length}>Create Now</button>

            </form>
        </div>
    );
};

export default CreateItem;
