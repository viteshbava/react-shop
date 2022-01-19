import React, { useEffect, useRef } from "react";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import Control, { CONTROL_TYPE } from "../UI/Control/Control";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import styles from "./SignIn.module.css";
import Alert from "../UI/Alert/Alert";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";

const SignIn = () => {
  const usernameRef = useRef();

  // focus username upon initial render
  useEffect(() => usernameRef.current && usernameRef.current.focus());

  return (
    <section>
      <SectionHeading>Sign in</SectionHeading>
      <div className={styles["form-container"]}>
        <Alert>Sorry, that username or password is incorrect.</Alert>
        <form>
          <Control
            type={CONTROL_TYPE.INPUT}
            label="Username"
            focusRef={usernameRef}
            attributes={{
              type: "text",
              id: "username",
              placeholder: "Enter username ...",
              // onChange: descriptionChangeHandler,
            }}
          />
          <Control
            type={CONTROL_TYPE.INPUT}
            label="Password"
            attributes={{
              type: "password",
              id: "password",
              placeholder: "Enter password ...",
              // onChange: descriptionChangeHandler,
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
