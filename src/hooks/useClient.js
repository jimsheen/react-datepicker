import {
  useState,
  useEffect,
} from 'react';

import axios from 'axios';

const useClient = ({ endpoint, errorMessage = 'You are not authorised' }) => {

  const [response, setResponse] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(endpoint);
      setResponse(response.data);
      setLoading(false);
      return response
    } catch (error) {
      setError(error);
      setLoading(false);
      return error
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return { response, isLoading, error };
}

export default useClient