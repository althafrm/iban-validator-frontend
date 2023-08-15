import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
    return (
        <div className='error'>
            <h2>404</h2>
            <p>Page Not Found</p>
            <Link to='/'>Back to Home</Link>
        </div>
    );
};

export default Error;
