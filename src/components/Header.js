import React from 'react';
import { Link } from 'react-router-dom';

import Logout from './Logout';

function Header({ authToken, currentUser, setAuthToken, setCurrentUser, setResponseMessage }) {

    return (
        <div className='header'>
            <nav>
                <ul>
                    {!authToken && <li><Link to="/register">Register</Link></li>}
                    {!authToken && <li><Link to="/login">Login</Link></li>}
                    {authToken && <li>
                        <Logout
                            authToken={authToken}
                            setCurrentUser={setCurrentUser}
                            setAuthToken={setAuthToken}
                            setResponseMessage={setResponseMessage}
                        />
                    </li>}
                </ul>
            </nav>
        </div>
    );
};

export default Header;
