import { useEffect, useState } from "react";

export const useFetch = (method, url, options = {}) => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    method(url, options)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
    // eslint-disable-next-line
  }, [url, forceUpdate]);

  return { data, isFetching, error, forceUpdate: () => setForceUpdate(true) };
};
