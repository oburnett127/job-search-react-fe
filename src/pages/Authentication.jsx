import React from 'react';
import AuthForm from '../components/AuthForm';
import UserProvider from '../components/UserContext';

function AuthenticationPage() {
  return (
    <UserProvider>
      <AuthForm />;
    </UserProvider>
  )
}

export default AuthenticationPage;
