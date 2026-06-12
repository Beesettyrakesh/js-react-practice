import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const { signal } = controller;

    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url, { signal });

        if (response.ok) {
          const parsedData = await response.json();
          setData(parsedData);
        } else {
          throw new Error(`Request failed: ${response.status}`);
        }

        setIsLoading(false);
      } catch (err) {
        if (err.name === "AbortError") return;
        setIsLoading(false);
        setError(err.message);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
