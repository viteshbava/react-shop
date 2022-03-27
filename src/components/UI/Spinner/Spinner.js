import PropTypes from 'prop-types';
import styles from './Spinner.module.css';

const Spinner = ({ className, width = '1.25rem', thickness = '0.15rem' }) => {
  const dimensions = {
    width,
    height: width,
    borderWidth: thickness,
    borderTopWidth: thickness,
  };

  const spinnerClasses = styles.main + (className ? ` ${className}` : '');

  return <div style={dimensions} className={spinnerClasses} />;
};

Spinner.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  thickness: PropTypes.string,
};
Spinner.defaultProps = {
  className: null,
  width: '1.25rem',
  thickness: '0.15rem',
};

export default Spinner;
