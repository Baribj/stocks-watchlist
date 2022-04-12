import { useEffect, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function fetchFn(url) {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        setError(true);
        return;
      }
      setData(data);
    }

    async function runFetchData() {
      try {
        setLoading(true);
        setError(false);
        await fetchData();
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    runFetchData();
  }

  return { fetchFn, data, loading, error };
};

export default useFetch;
