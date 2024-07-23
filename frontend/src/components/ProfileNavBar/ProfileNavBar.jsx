import './ProfileNavBar.css';
import { FaNewspaper } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const ProfileNavBar = () => {

    return (
        <div className="profile-navbar">
            <NavLink to="listings" className="newspaper"><FaNewspaper id="icon" /> Listings</NavLink>
            <NavLink to="reviews"><FaStar /> Reviews</NavLink>
        </div>
    );
};

export default ProfileNavBar;
