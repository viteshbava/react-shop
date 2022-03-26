import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styles from './Settings.module.css';
import SectionHeading from '../UI/SectionHeading/SectionHeading';
import Card from '../UI/Card/Card';
import TextField from '../UI/Control/TextField';
import Button from '../UI/Button/Button';
import useInput from '../../hooks/use-input';
import Alert, { ALERT_TYPE } from '../Feedback/Alert/Alert';
import { resetUserState } from '../../redux/slices/auth-slice';
import { changePassword } from '../../redux/actions/auth-actions';

const Settings = () => {
  const [showFormError, setFormError] = useState(null);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const {
    input: newPassword,
    inputValid: newPasswordValid,
    inputShowError: newPasswordShowError,
    setInputTouched: setNewPasswordTouched,
    inputChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
    resetInput: resetNewPassword,
  } = useInput((val) => val.trim() !== '');

  const {
    input: confirmPassword,
    inputValid: confirmPasswordValid,
    inputShowError: confirmPasswordShowError,
    setInputTouched: setConfirmPasswordTouched,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    resetInput: resetConfirmPassword,
  } = useInput((val) => val.trim() !== '');

  const formValid = newPasswordValid && confirmPasswordValid;

  useEffect(() => {
    if (error) {
      setFormError({
        type: ALERT_TYPE.ERROR,
        title: 'Cannot change password',
        message: error.message,
      });
      dispatch(resetUserState({ keepUser: true }));
    }
  }, [error, dispatch]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setNewPasswordTouched(true);
    setConfirmPasswordTouched(true);

    if (!formValid) return;

    if (newPassword !== confirmPassword) {
      setFormError({
        type: ALERT_TYPE.ERROR,
        title: 'Cannot change password',
        message: 'New password and confirm password do not match!',
      });
      return;
    }

    dispatch(
      changePassword({
        newPassword,
        onSuccess: () => {
          resetConfirmPassword();
          resetNewPassword();
        },
      })
    );
  };

  return (
    <>
      <SectionHeading>Settings</SectionHeading>
      <Card className={styles['setting-wrapper']}>
        <h3 className={styles.setting__heading}>Change Password</h3>

        <form className={styles.setting__form} onSubmit={formSubmitHandler}>
          {showFormError && (
            <Alert
              className={styles.alert}
              onClose={() => setFormError(null)}
              alert={showFormError}
            />
          )}
          <TextField
            invalid={newPasswordShowError}
            feedback={
              newPasswordShowError ? 'New Password must be entered' : null
            }
            label="New Password"
            type="password"
            id="new-password"
            value={newPassword}
            placeholder="Enter new password ..."
            onChange={newPasswordChangeHandler}
            onBlur={newPasswordBlurHandler}
          />
          <TextField
            invalid={confirmPasswordShowError}
            feedback={
              confirmPasswordShowError ? 'Password must be entered' : null
            }
            label="Confirm Password"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            placeholder="Confirm new password ..."
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
          />
          <Button className={styles.form__button} type="submit">
            Change Password
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Settings;
