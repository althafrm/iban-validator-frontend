export const getStatus = () => {
    const storedUserString = localStorage.getItem('user');
    return storedUserString !== null;
};

export const getRole = () => {
    const storedUserString = localStorage.getItem('user');
    const storedUser = JSON.parse(storedUserString);

    if (storedUser) {
        return storedUser.role;
    }

    return null;
};
