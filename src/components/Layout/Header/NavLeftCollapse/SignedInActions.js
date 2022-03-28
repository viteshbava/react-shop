import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../../../redux/actions/auth-actions';
import Button from '../../../UI/Button/Button';
import { uiActions } from '../../../../redux/slices/ui-slice';
import { ALERT_TYPE } from '../../../Feedback/Alert/Alert';
import Icon, { ICON_TYPE } from '../../../UI/Icon/Icon';

const SignedInActions = ({ close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSignOutHandler = async () => {
    dispatch(
      logout({
        onSuccess: () => {
          navigate('/');
          close();
        },
        onError: () =>
          dispatch(
            uiActions.addAlert({
              type: ALERT_TYPE.ERROR,
              title: 'Sign out fail',
              message: 'Failed to sign out!',
            })
          ),
      })
    );
  };
  return (
    <li>
      <Button
        onClick={onSignOutHandler}
        icon={<Icon icon={ICON_TYPE.SIGNOUT} />}
        variant="outlined"
      >
        Sign out
      </Button>
    </li>
  );
};

SignedInActions.propTypes = {
  close: PropTypes.func.isRequired,
};

export default SignedInActions;
