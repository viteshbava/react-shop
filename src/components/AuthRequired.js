import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRequired = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.user);

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
