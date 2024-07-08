import './Navigation.css';
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from '../SearchBar';
import { getStoreByCurrentUser } from '../../store/userStore.js';


function Navigation({ isLoaded }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const userStore = useSelector((state) => state.userStoreState.currentStore);
    const defaultProfilePic = "https://i.imghippo.com/files/YShri1720077342.jpg";

    useEffect(() => {
        dispatch(getStoreByCurrentUser())
    }, [dispatch]);

    return (
        <div className="navigation">

            <Link to="/"><img id="app-logo" src="./nooknet-logo.png" alt="Nooknet Logo" /></Link>

            <div>
                <SearchBar />
                {isLoaded && sessionUser && userStore &&
                    <>
                        <Link to={`/stores/${userStore.id}/create-item`} className="create-item-button"><HiMiniPencilSquare className="pencil-icon" /> Add Listing</Link>
                        <img src={userStore.Owner?.profilePic ? userStore.Owner.profilePic : defaultProfilePic} alt={`${sessionUser.username}'s Profile Picture`} className="profile-pic" onClick={() => navigate('/profile')} />
                    </>
                }
                {isLoaded && <ProfileButton className="profile-button" user={sessionUser} />}
            </div>

        </div>
    );
}

export default Navigation;
