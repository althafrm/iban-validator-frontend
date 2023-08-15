import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Api from '../Api';
import { getRole } from '../Auth';
import Loading from './Loading';

function LoginForm({ setAuthToken, setCurrentUser, setResponseMessage }) {
    const navigate = useNavigate();

    useEffect(() => {
        const role = getRole();

        if (role) {
            if (role === 'user') {
                navigate('/validate');
            } else if ((role === 'admin')) {
                navigate('/list');
            }
        }
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const onSuccess = (token, user, message) => {
            setAuthToken(token);
            setCurrentUser(user);
            setResponseMessage([1, message]);
            setIsLoading(false);
            navigate('/'); // Redirect to home
        };

        const onError = (error) => {
            setResponseMessage([2, error]);
            setIsLoading(false);
        };

        Api.login(email, password, onSuccess, onError);
    };

    return (
        <div className='login-form'>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <h3>Login</h3>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                        />
                        <button type="submit">Login</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default LoginForm;
