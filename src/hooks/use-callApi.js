import { useState, useEffect, useCallback } from "react";

const useCallApi = (apiRequest) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const apiRequest_cb = useCallback(apiRequest, []);

  useEffect(() => {
    const callApi = async () => {
      setIsLoading(true);
      try {
        const response = await apiRequest_cb();
        setResult(response);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    callApi();
  }, [apiRequest_cb]);

  return { isLoading, error, result };
};

export default useCallApi;
