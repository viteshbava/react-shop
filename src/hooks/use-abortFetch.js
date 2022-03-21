/* 

This custom hook can be used to cancel fetch requests that are in flight when the user logs out.

It requires an argument (isLoggedIn) that is truthy if the user is logged in, and falsy if not.

It will return the following data:

=> abortSignal: can be passed into fetch methods and will cancel those fetch methods when they are in flight and when the signal is aborted.

=> abortFetchCalls: aborts the signal to cancel fetch methods where abortSignal was passed.  It will also reset the abort controller ready for the next login.

=> runFetchCalls: true if the user is logged in and there is no fetch already in progress (fetchInProgress to be set using setFetchInProgress).  Can be used to trigger the fetching of data.

=> cancelFetchCalls: true if the user is logged out and a fetch is in progress.  Can be used to trigger the cancelling of in-flight fetches.

=> setFetchInProgress: can be used to set whether a fetch is in progress or not.

*/

import { useState, useCallback } from "react";

const useAbortFetch = (readyForFetch) => {
  const [controller, setController] = useState(new AbortController());
  const [fetchInProgress, setFetchInProgress] = useState(false);

  const runFetchCalls = readyForFetch && !fetchInProgress;
  const cancelFetchCalls = !readyForFetch && fetchInProgress;

  return {
    abortSignal: controller.signal,
    abortFetchCalls: useCallback(() => {
      controller.abort.bind(controller)();
      setController(new AbortController());
    }, [controller]),
    runFetchCalls,
    cancelFetchCalls,
    setFetchInProgress,
  };
};

export default useAbortFetch;
