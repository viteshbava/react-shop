import { useState, useEffect } from "react";

import styles from "./Settings.module.css";
import SectionHeading from "../../components/UI/SectionHeading/SectionHeading";
import Card from "../../components/UI/Card/Card";
import TextField from "../../components/UI/Control/TextField";
import Button from "../../components/UI/Button/Button";
import useInput from "../../hooks/use-input";
import Alert, { ALERT_TYPE } from "../../components/Feedback/Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { resetUserState } from "../../redux/slices/auth-slice";
import { changePassword } from "../../redux/actions/auth-actions";

const Settings = () => {
  const [showFormError, setFormError] = useState(null);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const {
    input: currentPassword,
    inputValid: currentPasswordValid,
    inputShowError: currentPasswordShowError,
    setInputTouched: setCurrentPasswordTouched,
    inputChangeHandler: currentPasswordChangeHandler,
    inputBlurHandler: currentPasswordBlurHandler,
  } = useInput((val) => val.trim() !== "");

  const {
    input: newPassword,
    inputValid: newPasswordValid,
    inputShowError: newPasswordShowError,
    setInputTouched: setNewPasswordTouched,
    inputChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
  } = useInput((val) => val.trim() !== "");

  const {
    input: confirmPassword,
    inputValid: confirmPasswordValid,
    inputShowError: confirmPasswordShowError,
    setInputTouched: setConfirmPasswordTouched,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput((val) => val.trim() !== "");

  const formValid =
    currentPasswordValid && newPasswordValid && confirmPasswordValid;

  useEffect(() => {
    if (error) {
      setFormError({
        type: ALERT_TYPE.ERROR,
        title: "Cannot change password",
        message: error.message,
      });
      dispatch(resetUserState({ keepUser: true }));
    }
  }, [error]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setCurrentPasswordTouched(true);
    setNewPasswordTouched(true);
    setConfirmPasswordTouched(true);

    if (!formValid) return;

    if (newPassword !== confirmPassword) {
      setFormError({
        type: ALERT_TYPE.ERROR,
        title: "Cannot change password",
        message: "New password and confirm password do not match!",
      });
      return;
    }

    dispatch(changePassword({ newPassword }));
  };

  return (
    <>
      <SectionHeading>Settings</SectionHeading>
      <Card className={styles["setting-wrapper"]}>
        <h3>Change Password</h3>

        <form className={styles["setting__form"]} onSubmit={formSubmitHandler}>
          {showFormError && (
            <Alert
              className={styles.alert}
              onClose={() => setFormError(null)}
              {...showFormError}
            />
          )}
          <TextField
            invalid={currentPasswordShowError && true}
            feedback={
              currentPasswordShowError && "Current Password must be entered"
            }
            label="Current Password"
            type="password"
            id="currentPassword"
            placeholder="Enter current password ..."
            value={currentPassword}
            onChange={currentPasswordChangeHandler}
            onBlur={currentPasswordBlurHandler}
          />
          <TextField
            invalid={newPasswordShowError && true}
            feedback={newPasswordShowError && "New Password must be entered"}
            label="New Password"
            type="password"
            id="new-password"
            placeholder="Enter new password ..."
            onChange={newPasswordChangeHandler}
            onBlur={newPasswordBlurHandler}
          />
          <TextField
            invalid={confirmPasswordShowError && true}
            feedback={confirmPasswordShowError && "Password must be entered"}
            label="Confirm Password"
            type="password"
            id="confirm-password"
            placeholder="Confirm new password ..."
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
          />
          <Button className={styles["form__button"]} type="submit">
            Change Password
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Settings;
