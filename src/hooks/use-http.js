/* 

This hook returns the following object: { isLoading, error, sendRequest };

<isLoading>: true if request is in progress; false if not.
<error>: the error returned; null if no error returned
<sendRequest>: is a function with the following arguments: (requestConfig, processData), where:

<requestConfig> = {method, body, headers, url}
<processData> = the function used to process the data returned from request

*/

import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, processData) => {
    setIsLoading(true);
    setError(null);

    const init = {
      method: requestConfig.method ? requestConfig.method : "GET",
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      headers: requestConfig.headers ? requestConfig.headers : {},
    };

    try {
      const response = await fetch(requestConfig.url, init);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      processData(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};

export default useHttp;
