import { useDispatch } from "react-redux";
import Alert from "./Alert";
import { uiActions } from "../../../redux/slices/ui-slice";
import { useEffect, useCallback } from "react";

const FloatingAlert = ({ id, ...props }) => {
  const dispatch = useDispatch();

  const closeAlert = useCallback(
    () => dispatch(uiActions.removeAlert(id)),
    [id, dispatch]
  );

  useEffect(() => {
    console.log("Setting timeout for alert!");
    const timeoutId = setTimeout(closeAlert, 4000);
    return () => clearTimeout(timeoutId);
  }, [closeAlert]);

  return <Alert {...props} onClose={closeAlert} />;
};

export default FloatingAlert;
