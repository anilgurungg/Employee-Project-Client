import { useState, useEffect } from 'react';
import AuthService from '../services/authService'; // Adjust the path to AuthService

const useFetch = (fetchMethod, ...args) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = AuthService.getToken; // Get the token

  useEffect(() => {
    
    let isMounted = true;

    async function fetchData() {
      try {
        const result = await fetchMethod(token, ...args); // Pass the token as the first argument
        if (isMounted) {
          setData(result);
          setLoading(false);
          console.log(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchMethod, token, ...args]);

  return { data, loading, error };
};

export default useFetch;
