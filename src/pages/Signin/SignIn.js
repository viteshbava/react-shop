import { useState, useContext, useEffect } from "react";
import useInput from "../../hooks/use-input";
import SectionHeading from "../../components/UI/SectionHeading/SectionHeading";
import TextField from "../../components/UI/Control/TextField";
import Button from "../../components/UI/Button/Button";
import styles from "./SignIn.module.css";
import Alert, { ALERT_TYPE } from "../../components/Feedback/Alert/Alert";
import Icon, { ICON_TYPE } from "../../components/UI/Icon/Icon";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth-actions";
import { reset } from "../../redux/slices/auth-slice";

const SignIn = () => {
  const { error } = useSelector((state) => state.auth);

  const [showSignInFailure, setShowSignInFailure] = useState(null);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (error)
      setShowSignInFailure({
        type: ALERT_TYPE.ERROR,
        title: "Unable to sign in",
        message: error.message,
      });
    dispatch(reset());
  }, [error]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setUsernameTouched(true);
    setPasswordTouched(true);

    if (!formValid) return;

    dispatch(login({ username, password }));

    // const result = ctx.onLogin(username, password);
    // if (result.success) {
    //   navigate("/");
    // } else {
    //   setShowSignInFailure(result.alert);
    // }
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
