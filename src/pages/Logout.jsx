import React, { useContext } from 'react';
import { UserContext } from '../components/UserContext';

function LogoutPage() {
  const { setIsLoggedIn } = useContext(UserContext);
   
  localStorage.removeItem('token');
  setIsLoggedIn(false); 
  
  return (
    <p style={{ textAlign: 'center'}}>You have successfully logged out</p>
  )
}

export default LogoutPage;
