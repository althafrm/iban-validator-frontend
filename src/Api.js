import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const Api = {
    register: async (formData, onSuccess, onError) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/api/register`, formData);

            if (response.data.success) {
                onSuccess(response.data.message);
            } else {
                onError(response.data.error);
            }
        } catch (error) {
            onError(error.response.data.error);
            console.error('Error while registering:', error);
        }
    },

    login: async (email, password, onSuccess, onError) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/api/login`, { email, password });
            console.log(response, response.data);

            if (response.data.success === true) {
                const token = response.data.token;
                const user = response.data.user;
                const message = response.data.message;

                localStorage.setItem('authToken', token);
                localStorage.setItem('user', JSON.stringify(user));

                onSuccess(
                    token,
                    user,
                    message,
                );
            } else {
                onError(response.data.error);
            }
        } catch (error) {
            onError(error.response.data.error);
            console.error('Error while logging in:', error);
        }
    },

    logout: async (token, onSuccess, onError) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/api/logout`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                onSuccess(response.data.message);
            } else {
                onError(response.data.error);
            }
        } catch (error) {
            onError(error.response.data.error);
            console.error('Error while logging out:', error);
        }
    },

    validateIban: async (iban, token, onSuccess, onError) => {
        console.log(token);
        try {
            const response = await axios.post(
                `${apiBaseUrl}/api/iban/validate`,
                { iban },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            const isValid = response.data.success && response.data.valid;

            if (isValid) {
                onSuccess(response.data.message);
            } else {
                onError(response.data.error);
            }
        } catch (error) {
            onError(error.response.data.error);
            console.error('Error while validating IBAN:', error);
        }
    },

    listIbans: async (token, page, onSuccess, onError) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/api/iban/list`, { page }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                const paginatedIbans = response.data.ibans;

                onSuccess(
                    paginatedIbans.data,
                    paginatedIbans.current_page,
                    paginatedIbans.last_page,
                );
            } else {
                onError(response.data.error);
            }
        } catch (error) {
            onError(error.response.data.error);
            console.error('Error while fetching IBAN list:', error);
        }
    },
};

export default Api;
