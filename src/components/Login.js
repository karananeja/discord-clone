import React from 'react';
import { auth, provider } from '../firebase';
import { Button } from '@mui/material';
import '../css/Login.css';

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className='login'>
      <div className='login__logo'>
        <img
          src='https://logos-download.com/wp-content/uploads/2021/01/Discord_Logo-1.png'
          alt='discord logo'
        />
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
};

export default Login;
