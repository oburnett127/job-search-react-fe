import React, { useContext } from 'react';
import { UserContext } from '../components/UserContext';

function LogoutPage() {
  const { setIsLoggedIn } = useContext(UserContext);
   
  localStorage.removeItem('jwtToken');
  sessionStorage.removeItem('csrfToken');
  setIsLoggedIn(false); 
  
  return (
    <p style={{ textAlign: 'center'}}>You have successfully logged out</p>
  )
}

export default LogoutPage;
