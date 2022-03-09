// This component is used to redirect to the root level if user attempts to visit a given page (e.g. /signin, /register) when they are already logged in

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../redux/slices/ui-slice";
import { ALERT_TYPE } from "../../components/Feedback/Alert/Alert";
import { Navigate } from "react-router-dom";

const AnonOnly = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.user);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(
  //       uiActions.addAlert({
  //         type: ALERT_TYPE.ERROR,
  //         title: "Already signed in!",
  //         message: "You are already signed in.",
  //       })
  //     );
  //     return;
  //   }
  // }, [dispatch, isLoggedIn]);

  return <>{!isLoggedIn ? children : <Navigate to={"/"} replace />}</>;
};

export default AnonOnly;
