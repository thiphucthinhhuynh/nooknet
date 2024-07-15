import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GoHome } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { PiStorefrontLight } from "react-icons/pi";
import { GoHeart } from 'react-icons/go';

const Sidebar = () => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div className="sidebar">
            <NavLink to="/"><GoHome /> Home</NavLink>
            <NavLink to="/stores"><PiStorefrontLight /> Stores</NavLink>
            {sessionUser &&
                (<>
                    <NavLink to="/profile"><GoPerson /> Your store</NavLink>
                    <NavLink to="/likes"><GoHeart /> Likes</NavLink>
                </>)}
        </div>
    );
};

export default Sidebar;
