import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({ className, children }) => {
  const classes = `${styles.card}${className ? ` ${className}` : ''}`;
  return <div className={classes}>{children}</div>;
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
Card.defaultProps = {
  className: null,
};

export default Card;
