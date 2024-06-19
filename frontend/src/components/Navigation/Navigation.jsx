import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="navigation">
            <div>
                <Link to="/"><img id="app-logo" src="https://images2.imgbox.com/f8/c8/9GyIU1ay_o.jpg" alt="Cozy Inn Logo" /></Link>
            </div>

            <div>
                {isLoaded && sessionUser && <Link to="/spots/new" className="create-spot-link">Create a New Spot</Link>}
                {isLoaded && <ProfileButton className="profile-button" user={sessionUser} />}
            </div>
        </div>
    );
}

export default Navigation;
