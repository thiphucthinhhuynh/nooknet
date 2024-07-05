import './Navigation.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);
    const userStore = useSelector((state) => state.userStoreState.currentStore);

    return (
        <div className="navigation">

            <div>
                <Link to="/"><img id="app-logo" src="./nooknet-logo.png" alt="Nooknet Logo" /></Link>
            </div>

            <div>
                {isLoaded && sessionUser && userStore && <Link to={`/stores/${userStore.id}/create-item`} className="create-item-button">Add Listing</Link>}
                {isLoaded && <ProfileButton className="profile-button" user={sessionUser} />}
            </div>

        </div>
    );
}

export default Navigation;
