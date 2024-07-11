import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupFormModal.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const isFormInvalid = !email || !username || !password || !confirmPassword;

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedUsername = username.trim();
        const trimmedFirstName = firstName.trim();
        const trimmedLastName = lastName.trim();

        let validationErrors = {};

        if (!trimmedUsername) {
            validationErrors.username = "Username cannot be empty, or contain only spaces";
        }

        if (firstName && !trimmedFirstName) {
            validationErrors.firstName = "First name cannot contain only spaces";
        }

        if (lastName && !trimmedLastName) {
            validationErrors.lastName = "Last name cannot contain only spaces";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.signup({
                    email,
                    username: trimmedUsername,
                    firstName: trimmedFirstName,
                    lastName: trimmedLastName,
                    password
                }))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data?.errors) {
                        setErrors(data.errors);
                    }
                });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };

    return (
        <div className="signup-modal">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="signup-input">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    {errors.email && <p className="errors">{errors.email}</p>}

                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                    {errors.username && <p className="errors">{errors.username}</p>}

                    <label>First Name (Optional)</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && <p className="errors">{errors.firstName}</p>}

                    <label>Last Name (Optional)</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && <p className="errors">{errors.lastName}</p>}

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    {errors.password && <p className="errors">{errors.password}</p>}

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required />
                    {errors.confirmPassword && (<p className="errors">{errors.confirmPassword}</p>)}
                </div>

                <button type="submit" disabled={isFormInvalid}>Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormModal;
