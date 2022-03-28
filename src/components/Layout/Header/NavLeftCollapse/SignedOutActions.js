import PropTypes from 'prop-types';
import Button from '../../../UI/Button/Button';
import Icon, { ICON_TYPE } from '../../../UI/Icon/Icon';

const SignedOutActions = ({ close }) => (
  <>
    <li>
      <Button
        onClick={close}
        icon={<Icon icon={ICON_TYPE.REGISTER} />}
        variant="outlined"
        link="/register"
      >
        Register
      </Button>
    </li>
    <li>
      <Button
        onClick={close}
        icon={<Icon icon={ICON_TYPE.SIGNIN} />}
        link="/signin"
      >
        Sign in
      </Button>
    </li>
  </>
);

SignedOutActions.propTypes = {
  close: PropTypes.func.isRequired,
};

export default SignedOutActions;
