import React, { useState, useContext } from "react";
import useInput from "../../hooks/use-input";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import Control, { CONTROL_TYPE } from "../UI/Control/Control";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import styles from "./SignIn.module.css";
import Alert from "../UI/Alert/Alert";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showSignInFailure, setShowSignInFailure] = useState(false);
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
      setShowSignInFailure(result);
    }
  };

  return (
    <section>
      <SectionHeading>Sign in</SectionHeading>
      <div className={styles["form-container"]}>
        {showSignInFailure && (
          <Alert onClose={() => setShowSignInFailure(false)}>
            {showSignInFailure.message}
          </Alert>
        )}
        <form onSubmit={formSubmitHandler}>
          <Control
            invalid={usernameShowError && true}
            feedback={usernameShowError && "Username must be entered"}
            type={CONTROL_TYPE.INPUT}
            label="Username"
            attributes={{
              type: "text",
              id: "username",
              placeholder: "Enter username ...",
              value: username,
              onChange: usernameChangeHandler,
              onBlur: usernameBlurHandler,
            }}
          />
          <Control
            invalid={passwordShowError && true}
            feedback={passwordShowError && "Password must be entered"}
            type={CONTROL_TYPE.INPUT}
            label="Password"
            attributes={{
              type: "password",
              id: "password",
              placeholder: "Enter password ...",
              onChange: passwordChangeHandler,
              onBlur: passwordBlurHandler,
            }}
          />
          <Button
            className={styles["sign-in-button"]}
            style={BTN_TYPE.PRIMARY}
            type="submit"
          >
            <Icon icon={ICON_TYPE.SIGNIN} />
            Sign in
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
