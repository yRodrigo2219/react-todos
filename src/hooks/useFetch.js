import { useEffect, useState } from "react";

export const useFetch = (method, url, options = {}) => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(true);

  useEffect(() => {
    setIsFetching(true);
    method(url, options) // faz a requisição
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
  }, [url, toggleUpdate]);

  return {
    data,
    isFetching,
    error,
    forceUpdate: () => setToggleUpdate(!toggleUpdate),
  };
};
