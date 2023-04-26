import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(0);

  return (
    <UserContext.Provider value={{ email, setEmail, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
