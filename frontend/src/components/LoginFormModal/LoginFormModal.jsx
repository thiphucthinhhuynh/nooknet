import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginFormModal.css';

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const isFormValid = credential.length >= 4 && password.length >= 6;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    const handleDemoLogin = (e) => {
        e.preventDefault();
        setErrors({});

        return dispatch(sessionActions.login({ credential: 'demo_user', password: 'password' }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };


    return (
        <div className="login-modal">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className="login-form">
                    <label>Username or Email</label>
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />

                    {errors.credential && (<span className="errors">{errors.credential}</span>)}
                </div>

                <button type="submit" disabled={!isFormValid}>Log In</button>
            </form>

            <a href="#" onClick={handleDemoLogin}>Demo User</a>
        </div>
    );
}

export default LoginFormModal;
