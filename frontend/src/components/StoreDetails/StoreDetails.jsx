import './StoreDetails.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchStoreDetails } from '../../store/userStore.js';

const StoreDetails = () => {
    const { storeId } = useParams();
    const dispatch = useDispatch();
    const store = useSelector((state) => state.userStore?.storeDetails);

    useEffect(() => {
        dispatch(fetchStoreDetails(storeId));
    }, [dispatch, storeId]);

    return (
        <div>
            <h1>Hi from StoreDetails</h1>
            <div>{store?.name}</div>
            <div>{store?.location}</div>
            <div>{store?.description}</div>
        </div>
    );
};

export default StoreDetails;
