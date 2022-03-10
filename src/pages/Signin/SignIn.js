import { useState, useEffect } from "react";
import useInput from "../../hooks/use-input";
import SectionHeading from "../../components/UI/SectionHeading/SectionHeading";
import TextField from "../../components/UI/Control/TextField";
import Button from "../../components/UI/Button/Button";
import styles from "./SignIn.module.css";
import Alert, { ALERT_TYPE } from "../../components/Feedback/Alert/Alert";
import Icon, { ICON_TYPE } from "../../components/UI/Icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth-actions";
import { resetUserState } from "../../redux/slices/auth-slice";
import { useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
  const { user, error } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [showSignInFailure, setShowSignInFailure] = useState(null);
  const dispatch = useDispatch();

  const {
    input: username,
    inputValid: usernameValid,
    inputShowError: usernameShowError,
    setInputTouched: setUsernameTouched,
    inputChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput((val) => val.trim() !== "");

  const {
    input: password,
    inputValid: passwordValid,
    inputShowError: passwordShowError,
    setInputTouched: setPasswordTouched,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((val) => val.trim() !== "");

  const formValid = usernameValid && passwordValid;

  // If user is already logged in, either navigate back to root or back to the previous attempted visit if it exists
  useEffect(() => {
    if (user) {
      console.log("We are rendering signin but we are already logged in!!");
      location?.state?.from
        ? navigate(location.state.from, { replace: true })
        : navigate("/", { replace: true });
    }
  }, [user, navigate, location]);

  useEffect(() => {
    if (error)
      setShowSignInFailure({
        type: ALERT_TYPE.ERROR,
        title: "Unable to sign in",
        message: error.message,
      });
    dispatch(resetUserState());
  }, [error]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setUsernameTouched(true);
    setPasswordTouched(true);

    if (!formValid) return;

    dispatch(login({ user: { username, password } }));
  };

  return (
    <section>
      <SectionHeading>Sign in</SectionHeading>
      <div className={styles["form-container"]}>
        {showSignInFailure && (
          <Alert
            onClose={() => setShowSignInFailure(null)}
            {...showSignInFailure}
          />
        )}
        <form onSubmit={formSubmitHandler}>
          <TextField
            invalid={usernameShowError && true}
            feedback={usernameShowError && "Username must be entered"}
            label="Username"
            id="username"
            placeholder="Enter username ..."
            value={username}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
          />
          <TextField
            invalid={passwordShowError && true}
            feedback={passwordShowError && "Password must be entered"}
            label="Password"
            type="password"
            id="password"
            placeholder="Enter password ..."
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          <Button
            className={styles["sign-in-button"]}
            icon={<Icon icon={ICON_TYPE.SIGNIN} />}
            type="submit"
          >
            Sign in
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
