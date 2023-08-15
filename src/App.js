import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Error from './components/Error';
import RegistrationForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import IbanValidateForm from './components/IbanValidateForm';
import IbanList from './components/IbanList';
import Header from './components/Header';
import Footer from './components/Footer';
import Redirect from './components/Redirect';
import './index.css';

function App() {
  const [authToken, setAuthToken] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [responseMessage, setResponseMessage] = useState([]); // 1 => green, 2 => red

  useEffect(() => {
    // Check if there's an admin token in local storage (user is logged in)
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  return (
    <div className='app'>
      <Header
        authToken={authToken}
        setCurrentUser={setCurrentUser}
        setAuthToken={setAuthToken}
        setResponseMessage={setResponseMessage}
      />
      <div className="content">
        <Routes>
          <Route
            path='/'
            element={
              <Redirect
                authToken={authToken}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path='/register'
            element={
              <RegistrationForm
                setResponseMessage={setResponseMessage}
              />
            }
          />
          <Route
            path='/login'
            element={
              <LoginForm
                setAuthToken={setAuthToken}
                setResponseMessage={setResponseMessage}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path='/validate'
            element={
              <IbanValidateForm
                authToken={authToken}
                setAuthToken={setAuthToken}
                setResponseMessage={setResponseMessage}
              />
            }
          />
          <Route
            path='/list'
            element={
              <IbanList
                authToken={authToken}
                setResponseMessage={setResponseMessage}
              />
            }
          />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
      <Footer
        responseMessage={responseMessage}
      />
    </div>
  );
}

export default App;
