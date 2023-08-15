import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Api from '../Api';
import { getRole } from '../Auth';
import Loading from './Loading';

function RegisterForm({ setResponseMessage }) {
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

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (formData.password !== formData.password_confirmation) {
            setResponseMessage([2, 'Passwords do not match']);
            return;
        }

        const onSuccess = (message) => {
            setResponseMessage([1, message]);
            setIsLoading(false);
            navigate('/login'); // Redirect to login
        };

        const onError = (error) => {
            setResponseMessage([2, error]);
            setIsLoading(false);
        };

        Api.register(formData, onSuccess, onError);
    };

    return (
        <div className='register-form'>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <h3>Register</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        <input
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                        />
                        <button type="submit">Register</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default RegisterForm;
