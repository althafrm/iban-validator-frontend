import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Api from '../Api';
import Loading from './Loading';

function Logout({ authToken, setCurrentUser, setAuthToken, setResponseMessage }) {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);

        if (!authToken) {
            console.error('Logout error: No authentication token');
            setResponseMessage([2, 'No authentication token found.']);
            return;
        }

        const onSuccess = (message) => {
            setResponseMessage([1, message]);
            setAuthToken('');
            setCurrentUser({});
            setIsLoading(false);
            navigate('/login'); // Redirect to login
        };

        const onError = (error) => {
            setResponseMessage([2, error]);
            setIsLoading(false);
        };

        Api.logout(authToken, onSuccess, onError);
    }

    return (
        <div className="logout">
            <>
                <button onClick={handleLogout}>Logout</button>
            </>
            {isLoading && (
                <Loading />
            )}
        </div>
    );
};

export default Logout;
