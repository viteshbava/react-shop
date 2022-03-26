import PropTypes from 'prop-types';
import styles from './Badge.module.css';

const Badge = ({ className, children }) => {
  let badgeStyles = styles.wrapper;
  if (className) badgeStyles = `${badgeStyles} ${className}`;
  return <div className={badgeStyles}>{children}</div>;
};

Badge.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
Badge.defaultProps = {
  className: null,
};

export default Badge;
