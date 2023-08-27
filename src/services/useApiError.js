import { useState, useCallback } from 'react';

function useApiError() {
  const [error, setError] = useState(null);

  const handleApiError = useCallback((message) => {
    setError(message);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleApiError, clearError };
}

export default useApiError;

