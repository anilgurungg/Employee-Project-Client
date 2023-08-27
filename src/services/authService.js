// src/services/authService.js
import axios from 'axios';
import API_BASE_URL from '../config';
import ApiException from '../ApiException';
import jwtDecode from 'jwt-decode';

const TOKEN_KEY = 'jwtToken';
const TOKEN_EXPIRATION = 'jwtExpiryTime';

const AuthService = {
  login: async (emailId, password) => {
    try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { emailId, password });
  
    return response.data;
  }
  catch (error) {
    // throw new Error(error);
    const { message, success, errorStrings } = error.response.data;
            const statusCode = error.response.status;
    throw new ApiException(message, statusCode);
  }
  },
  signup: async (employeeName, emailId, password , salary) => {
    try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, { employeeName, emailId, password, salary });
   
    return response;
  }
  catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      const { message, success } = error.response.data;
      const statusCode = error.response.status;
      if (statusCode === 409) {
        throw new ApiException("Email already taken", statusCode)
      } 

      throw new ApiException(message, statusCode);
    } else {
      throw new ApiException('An error occurred while signing up');
    }
  }
  },
  setToken: (token) => {
    // localStorage.setItem(TOKEN_KEY, token);
    const decodedToken = jwtDecode(token); // Assuming you're using a library like jwtDecode to decode the token

// Calculate the token's expiry time
const expiryTime = decodedToken.exp * 1000; // Convert seconds to milliseconds

// Store the token and expiry time in localStorage
localStorage.setItem(TOKEN_KEY, token);
localStorage.setItem(TOKEN_EXPIRATION, expiryTime);

// Periodically check if the token has expired
const checkExpiryInterval = setInterval(() => {
  const currentTimestamp = Date.now();
  const storedExpiryTime = localStorage.getItem(TOKEN_EXPIRATION);

  if (storedExpiryTime && currentTimestamp > parseInt(storedExpiryTime, 10)) {
    // Token has expired, clear it from localStorage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRATION);

    // Also clear the interval since we don't need to check anymore
    clearInterval(checkExpiryInterval);
  }
}, 60000); // Check every minute
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
  isAuthenticated: () => {
    const token = AuthService.getToken();
    return token !== null;
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRATION);
  },
  getUser: async () => {
    const token = AuthService.getToken();
    if (token) {
      try {
        const response = await axios.get(`${API_BASE_URL}/employees/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        return response.data;
      } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
    }

    return null;
  }
  // Add other authentication-related methods here
};

export default AuthService;
