import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);

      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        setIsPending(false);
        setData(data);
        setError(null);

      } catch (error) {
        
        if (error.name === "AbortError") {
          console.log("Fetch got aborted.");
        } else {
          setIsPending(false);
          setError("Could not fetch.");
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
    
  }, [url]);

  return { isPending, data, error };
};
