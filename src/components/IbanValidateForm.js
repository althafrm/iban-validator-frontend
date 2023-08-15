import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Api from '../Api';
import { getRole } from '../Auth';
import Loading from './Loading';

function IbanValidateForm({ authToken, setResponseMessage }) {
    const navigate = useNavigate();

    useEffect(() => {
        const role = getRole();

        if (role !== 'user') {
            navigate('/');
        }
    }, []);

    const [iban, setIban] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleIbanChange = (e) => {
        setIban(e.target.value);
    };

    const handleValidate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!authToken) {
            console.error('No authentication token found.');
            setResponseMessage([2, 'No authentication token found.']);
            return;
        }

        const onSuccess = (message) => {
            setResponseMessage([1, message]);
            setIsLoading(false);
        };

        const onError = (error) => {
            setResponseMessage([2, error]);
            setIsLoading(false);
        };

        Api.validateIban(iban, authToken, onSuccess, onError);
    };

    return (
        <div className='iban-validate'>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="validation-form">
                        <h3>IBAN Validation</h3>
                        <form onSubmit={handleValidate}>
                            <input
                                type="text"
                                value={iban}
                                onChange={handleIbanChange}
                                placeholder="Enter IBAN"
                            />
                            <button type="submit">Validate</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default IbanValidateForm;
