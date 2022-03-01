import React, { useState, useContext } from "react";
import useInput from "../../hooks/use-input";
import SectionHeading from "../../components/UI/SectionHeading/SectionHeading";
import TextField from "../../components/UI/Control/TextField";
import Button from "../../components/UI/Button/Button";
import Alert, { ALERT_TYPE } from "../../components/Feedback/Alert/Alert";
import Icon, { ICON_TYPE } from "../../components/UI/Icon/Icon";
import { useNavigate } from "react-router-dom";

import styles from "./Register.module.css";

const Register = () => {
  const [showFormError, setFormError] = useState(null);
  const navigate = useNavigate();

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

  const {
    input: confirmPassword,
    inputValid: confirmPasswordValid,
    inputShowError: confirmPasswordShowError,
    setInputTouched: setConfirmPasswordTouched,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput((val) => val.trim() !== "");

  const formValid = usernameValid && passwordValid && confirmPasswordValid;

  // const ctx = useContext(AuthContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setUsernameTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    if (!formValid) return;

    if (password !== confirmPassword) {
      setFormError({
        type: ALERT_TYPE.ERROR,
        title: "Unable to register",
        message: "Passwords do not match!",
      });
      return;
    }

    console.log("Register user...");

    // const result = ctx.onLogin(username, password);
    // if (result.success) {
    //   navigate("/");
    // } else {
    //   setFormError(result.alert);
    // }
  };

  return (
    <section>
      <SectionHeading>Register</SectionHeading>
      <div className={styles["form-container"]}>
        {showFormError && (
          <Alert onClose={() => setFormError(null)} {...showFormError} />
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
          <TextField
            invalid={confirmPasswordShowError && true}
            feedback={confirmPasswordShowError && "Password must be entered"}
            label="Confirm Password"
            type="password"
            id="confirm-password"
            placeholder="Confirm password ..."
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
          />
          <Button
            className={styles["register-button"]}
            icon={<Icon icon={ICON_TYPE.REGISTER} />}
            type="submit"
          >
            Sign in
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Register;
