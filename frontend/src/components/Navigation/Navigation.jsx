import './Navigation.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="navigation">

            <div>
                <Link to="/"><img id="app-logo" src="./gamazon-logo.png" alt="Gamazon Logo" /></Link>
            </div>

            <div>
                {isLoaded && sessionUser && <Link to="/items/new" className="create-item-button">Add Listing</Link>}
                {isLoaded && <ProfileButton className="profile-button" user={sessionUser} />}
            </div>

        </div>
    );
}

export default Navigation;
