import './StoreItemTiles.css';
import { useOutletContext } from 'react-router-dom';
import ItemTileList from '../ItemTileList';

const StoreItemTiles = () => {

    const { items } = useOutletContext();

    return (
        <ItemTileList items={items} />
    );
};

export default StoreItemTiles;
