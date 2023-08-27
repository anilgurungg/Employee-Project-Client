import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/authService';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    fetchCurrentUser().catch(err => {
      setErrors(err);
    })
    .finally(() => setLoading(false));
    // const token = AuthService.getToken();
    // if (token) {
    //   AuthService.getUser()
    //     .then(user => setCurrentUser(user))
    //     .then( setIsAdmin(currentUser && currentUser.roles.some(role => role.name === 'ROLE_ADMIN')))
    //     .catch(error => console.error('Error fetching user:', error));
    // }
  }, []);

  const fetchCurrentUser =  async () => {
    try {
      const user = await AuthService.getUser();
      setCurrentUser(user);
      setIsAdmin(currentUser && currentUser.roles.some(role => role.name === 'ROLE_ADMIN'));
      console.log(currentUser); 
    } catch (error) {
      console.log(error.message);
      setErrors(error.message);
    }
  }


  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      const {accessToken } = response; 
      console.log(accessToken);
      AuthService.setToken(response.accessToken);
      // fetchCurrentUser();
      const user = await AuthService.getUser();
      
      setCurrentUser(user);
      console.log(currentUser);  
      // You can also store the token if needed
    } catch (error) {
      console.log(error.message);
      setErrors(error.message);
      // Handle error
    }
  };

  const logout = () => {
    setIsAdmin(false);
    setCurrentUser(null);
    AuthService.logout();
    // You can also clear the stored token if needed
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout, isAdmin,errors, setErrors,fetchCurrentUser,loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
