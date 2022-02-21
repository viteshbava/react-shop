import React, { useState, useContext } from "react";
import useInput from "../../hooks/use-input";
import SectionHeading from "../../components/UI/SectionHeading/SectionHeading";
import TextField from "../../components/UI/Control/TextField";
import Button from "../../components/UI/Button/Button";
import styles from "./SignIn.module.css";
import Alert from "../../components/UI/Alert/Alert";
import Icon, { ICON_TYPE } from "../../components/UI/Icon/Icon";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showSignInFailure, setShowSignInFailure] = useState(null);
  const navigate = useNavigate();

  const {
    input: username,
    inputValid: usernameValid,
    inputShowError: usernameShowError,
    setInputTouched: setUsernameTouched,
    inputChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    resetInput: resetUserName,
  } = useInput((val) => val.trim() !== "");

  const {
    input: password,
    inputValid: passwordValid,
    inputShowError: passwordShowError,
    setInputTouched: setPasswordTouched,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetInput: resetPassword,
  } = useInput((val) => val.trim() !== "");

  const formValid = usernameValid && passwordValid;

  const ctx = useContext(AuthContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setUsernameTouched(true);
    setPasswordTouched(true);

    if (!formValid) return;

    const result = ctx.onLogin(username, password);
    if (result.success) {
      navigate("/");
    } else {
      setShowSignInFailure(result.alert);
    }
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