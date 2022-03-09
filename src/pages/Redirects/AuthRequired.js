import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ALERT_TYPE } from "../../components/Feedback/Alert/Alert";
import { uiActions } from "../../redux/slices/ui-slice";

const AuthRequired = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.user);

  console.log("AuthRequired, children: ", children);

  // useEffect(() => {
  //   if (!isLoggedIn)
  //     dispatch(
  //       uiActions.addAlert({
  //         type: ALERT_TYPE.ERROR,
  //         title: "Sign in required!",
  //         message: "You must sign in to do that.",
  //       })
  //     );
  // }, [dispatch, isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        children
      ) : (
        <Navigate to="/signin" state={{ from: location }} replace />
      )}
    </>
  );
};

export default AuthRequired;
