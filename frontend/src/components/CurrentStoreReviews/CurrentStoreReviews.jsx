import './CurrentStoreReviews.css';
import { useState } from 'react';
import StoreReviews from '../StoreReviews';

const CurrentStoreReviews = () => {
    const [activeComponent, setActiveComponent] = useState('StoreReviews');

    return (
        <div className="current-store-reviews">
            <div>
                <button
                    className={`button ${activeComponent === 'StoreReviews' ? 'active' : 'inactive'}`}
                    onClick={() => setActiveComponent('StoreReviews')}
                >Reviews about You</button>
                <button
                    className={`button ${activeComponent === 'MyReviews' ? 'active' : 'inactive'}`}
                    onClick={() => setActiveComponent('MyReviews')}
                >Reviews by You</button>
            </div>
            {activeComponent === 'StoreReviews' && <StoreReviews />}
            {activeComponent === 'MyReviews' && <div>My Reviews</div>}
        </div>
    );
};

export default CurrentStoreReviews;
