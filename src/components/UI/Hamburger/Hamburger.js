import PropTypes from 'prop-types';
import styles from './Hamburger.module.css';

const Hamburger = ({ onClick, className, rowHeight }) => {
  const buttonClasses = styles.wrapper + (className ? ` ${className}` : '');
  const height = { height: `${rowHeight}px` };
  return (
    <button type="button" onClick={onClick} className={buttonClasses}>
      <span style={height} className={styles.row} />
      <span style={height} className={styles.row} />
      <span style={height} className={styles.row} />
    </button>
  );
};

Hamburger.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  rowHeight: PropTypes.number,
};
Hamburger.defaultProps = {
  onClick: () => {},
  className: null,
  rowHeight: 2,
};

export default Hamburger;
