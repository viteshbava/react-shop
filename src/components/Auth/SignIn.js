import React from "react";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import Input from "../UI/Input/Input";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import styles from "./SignIn.module.css";
import Alert from "../UI/Alert/Alert";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";

const SignIn = () => {
  return (
    <section>
      <SectionHeading>Sign in</SectionHeading>
      <div className={styles["form-container"]}>
        <Alert>Sorry, that username or password is incorrect.</Alert>
        <form>
          <Input
            label="Username"
            input={{
              type: "text",
              id: "username",
              placeholder: "Enter username ...",
              // onChange: descriptionChangeHandler,
            }}
          />
          <Input
            label="Password"
            input={{
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
