import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './SignedInInfo.module.css';

const trimText = (text, maxLength = 21) =>
  text.length > maxLength ? `${text.substring(0, maxLength + 1)} ...` : text;

const SignedInInfo = ({ className }) => {
  const { email } = useSelector((state) => state.auth.user);
  const classes = styles.wrapper + (className ? ` ${className}` : '');
  return (
    <div className={classes}>
      <div className={styles.label}>Signed in as</div>
      <div className={styles.username}>{trimText(email)}</div>
    </div>
  );
};

SignedInInfo.propTypes = {
  className: PropTypes.string,
};
SignedInInfo.defaultProps = {
  className: null,
};

export default SignedInInfo;
