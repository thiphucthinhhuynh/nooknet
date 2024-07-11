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

    // const isFormInvalid = !name || !price || !quantity || !category;

    useEffect(() => {
        const resetForm = () => {
            setName(''),
                setDescription(''),
                setPrice(''),
                setQuantity(1),
                setCategory(''),
                setValidationErrors({})
        };

        return resetForm;
    }, []);

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

        const newItem = await dispatch(createNewItem(newItemData, storeId))
            .catch(async (response) => {
                const data = await response.json();
                if (data?.errors) {
                    setValidationErrors(data.errors);
                }
            });

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
                {validationErrors.name && <p className="errors">{validationErrors.name}</p>}

                <label>Description (Optional)</label>
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
                {validationErrors.price && <p className="errors">{validationErrors.price}</p>}

                <label>Amount</label>
                <input
                    name="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                {validationErrors.quantity && <p className="errors">{validationErrors.quantity}</p>}

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
                {validationErrors.category && <p className="errors">{validationErrors.category}</p>}

                <div>
                    <button id="cancel" type="button" onClick={() => navigate('/profile')}>Cancel</button>
                    {/* <button id="create-item" type="submit" disabled={isFormInvalid} >Create Now</button> */}
                    <button id="create-item" type="submit" >Create Now</button>
                </div>
            </form>

        </div>
    );
};

export default CreateItem;
