import React from 'react';
import { Navigate } from 'react-router-dom';

import { getStatus, getRole } from '../Auth';

function Redirect() {
    if (getStatus()) {
        const role = getRole();

        if (role === 'user') {
            return <Navigate to='/validate' />;
        } else if (role === 'admin') {
            return <Navigate to='/list' />;
        }
    }

    return <Navigate to='/login' />;
};

export default Redirect;
