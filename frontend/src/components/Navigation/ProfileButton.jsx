import './ProfileButton.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        navigate('/');
    };

    return (
        <>
            <button className="profile-button" onClick={toggleMenu}>
                <GiHamburgerMenu />  <FaUserCircle />
            </button>
            {showMenu && <ul className="profile-dropdown" ref={ulRef}>
                {user ? (
                    <>
                        <div>Hello, {user.firstName}</div>
                        <div>{user.username}</div>
                        <div>{user.firstName} {user.lastName}</div>
                        <div>{user.email}</div>
                        <div><Link to="/spots/current">Manage Spots</Link></div>
                        <div><button onClick={logout}>Log Out</button></div>
                    </>
                ) : (
                    <>
                        <OpenModalMenuItem
                            itemText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </>
                )}
            </ul>}
        </>
    );
}




export default ProfileButton;
