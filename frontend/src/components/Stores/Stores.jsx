import './Stores.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStores } from '../../store/userStore.js';

const Stores = () => {
    const dispatch = useDispatch();
    const stores = useSelector((state) => state.userStoreState.allStores);

    useEffect(() => {
        dispatch(fetchAllStores());
    }, [dispatch]);

    return (
        <div>
            <h1>Hi from Stores</h1>
            {stores.map((store) => (
                <span key={store.id}>
                    <Link to={`/stores/${store.id}`}>
                        <div>{store.name}</div>
                        <div>{store.location}</div>
                    </Link>
                </span>
            ))}
        </div>
    );
};

export default Stores;
