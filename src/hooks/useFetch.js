import { useEffect, useState } from 'react';

export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    fetchFn()
      .then((res) => {
        if (!isCancelled) setData(res);
      })
      .catch((err) => {
        if (!isCancelled) setError(err);
      })
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, deps);

  return { data, loading, error };
}
