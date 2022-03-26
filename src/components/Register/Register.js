import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/use-input';
import SectionHeading from '../UI/SectionHeading/SectionHeading';
import TextField from '../UI/Control/TextField';
import Button from '../UI/Button/Button';
import Alert, { ALERT_TYPE } from '../Feedback/Alert/Alert';
import Icon, { ICON_TYPE } from '../UI/Icon/Icon';
import { register } from '../../redux/actions/auth-actions';
import { resetUserState } from '../../redux/slices/auth-slice';
import styles from './Register.module.css';

const Register = () => {
  const [showFormError, setFormError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.auth);

  const {
    input: username,
    inputValid: usernameValid,
    inputShowError: usernameShowError,
    setInputTouched: setUsernameTouched,
    inputChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput((val) => val.trim() !== '');

  const {
    input: password,
    inputValid: passwordValid,
    inputShowError: passwordShowError,
    setInputTouched: setPasswordTouched,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((val) => val.trim() !== '');

  const {
    input: confirmPassword,
    inputValid: confirmPasswordValid,
    inputShowError: confirmPasswordShowError,
    setInputTouched: setConfirmPasswordTouched,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput((val) => val.trim() !== '');

  const formValid = usernameValid && passwordValid && confirmPasswordValid;

  // If user is already logged in, reirect to root page
  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    if (error)
      setFormError({
        type: ALERT_TYPE.ERROR,
        title: 'Unable to register',
        message: error.message,
      });
    dispatch(resetUserState());
  }, [error, dispatch]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setUsernameTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    if (!formValid) return;

    if (password !== confirmPassword) {
      setFormError({
        type: ALERT_TYPE.ERROR,
        title: 'Unable to register',
        message: 'Passwords do not match!',
      });
      return;
    }

    dispatch(register({ username, password }));
  };

  return (
    <section>
      <SectionHeading>Register</SectionHeading>
      <div className={styles['form-container']}>
        {showFormError && (
          <Alert onClose={() => setFormError(null)} alert={showFormError} />
        )}
        <form onSubmit={formSubmitHandler}>
          <TextField
            invalid={usernameShowError}
            feedback={usernameShowError ? 'Username must be entered' : null}
            label="Username"
            id="username"
            placeholder="Enter username ..."
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
          />
          <TextField
            invalid={passwordShowError}
            feedback={passwordShowError ? 'Password must be entered' : null}
            label="Password"
            type="password"
            id="password"
            placeholder="Enter password ..."
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          <TextField
            invalid={confirmPasswordShowError}
            feedback={
              confirmPasswordShowError ? 'Password must be entered' : null
            }
            label="Confirm Password"
            type="password"
            id="confirm-password"
            placeholder="Confirm password ..."
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
          />
          <Button
            className={styles['register-button']}
            icon={<Icon icon={ICON_TYPE.REGISTER} />}
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Register;
