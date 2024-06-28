import './Sidebar';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GoHome } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { PiStorefrontLight } from "react-icons/pi";
import { FiThumbsUp } from "react-icons/fi";


const Sidebar = () => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div>
            <h1>Hi from Sidebar</h1>
            <NavLink to="/"><GoHome /> Home</NavLink>
            <NavLink to="/stores"><PiStorefrontLight /> Stores</NavLink>
            {sessionUser &&
                (<>
                    <NavLink to="/profile"><GoPerson /> Your store</NavLink>
                    <NavLink to="/likes"><FiThumbsUp /> Likes</NavLink>
                </>)}
        </div>
    );
};

export default Sidebar;
