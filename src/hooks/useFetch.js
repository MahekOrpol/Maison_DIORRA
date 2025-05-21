import { useEffect, useState } from 'react';
import axios from 'axios';

export function useFetch(url, params = {}, deps = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    axios
      .get(url, { params })
      .then((res) => {
        if (!isCancelled) setData(res.data);
      })
      .catch((err) => {
        if (!isCancelled) setError(err);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [url, JSON.stringify(params), ...deps]);

  return { data, isLoading, error };
}
