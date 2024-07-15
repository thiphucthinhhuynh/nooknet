import './StoreItemTiles.css';
import BearCoin from '../BearCoin';
import { Link } from 'react-router-dom';

const StoreItemTiles = ({ items }) => {
    const defaultItemPic = "https://i.imghippo.com/files/WF7he1720243556.png";

    return (
        <div className="item-section">
            {items.map((item) => (
                <span key={item.id}>
                    <div id="item-tile">
                        <Link to={`/items/${item.id}`} className="item-info">
                            <img
                                src={Array.isArray(item.ItemImages) && item.ItemImages.length > 0
                                    ? item.ItemImages[0].url
                                    : defaultItemPic}
                                className="item-pic"
                            />

                            <div>
                                <div id="item-name">{item.name}</div>
                                <div>{item.category}</div>
                                <div>{item.price == 1 ? '1 Bear coin' : <div>{item.price}<BearCoin />coins</div>}</div>
                            </div>
                        </Link>
                    </div>
                </span>
            ))}
        </div>
    );
};

export default StoreItemTiles;
