import { useEffect, useState } from 'react';

export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    fetchFn()
      .then((res) => {
        if (!isCancelled) setData(res);
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
  }, deps);

  return { data, isLoading, error };
}
