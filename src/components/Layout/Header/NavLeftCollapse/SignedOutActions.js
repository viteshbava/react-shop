import PropTypes from 'prop-types';
import Button from '../../../UI/Button/Button';
import Icon, { ICON_TYPE } from '../../../UI/Icon/Icon';

const SignedOutActions = ({ close }) => <></>;

SignedOutActions.propTypes = {
  close: PropTypes.func.isRequired,
};

export default SignedOutActions;
