import './SearchBar.css';
import { FcSearch } from "react-icons/fc";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('items');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?type=${type}&query=${query}`);
    };

    return (
        <form className="search-bar" onSubmit={handleSearch}>

            <select id="selection"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="items">Items <IoIosArrowDown /></option>
                <option value="users">Users <IoIosArrowDown /></option>
            </select>

            <input id="input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
            />
            <button type="submit" id="icon"><FcSearch /></button>
        </form>
    );

};

export default SearchBar;
