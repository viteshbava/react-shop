import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';
import Spinner from '../Spinner/Spinner';

const Button = ({
  className,
  variant,
  color,
  onClick,
  children,
  type,
  link,
  icon,
  disabled,
  loading,
}) => {
  let btnStyles = styles.btn;
  btnStyles += ` ${styles[`btn--${variant}`]}`;
  btnStyles +=
    disabled || loading
      ? ` ${styles['btn--disabled']}`
      : ` ${styles[`btn--${color}`]}`;
  if (className) btnStyles += ` ${className}`;

  const content = (
    <>
      {loading && <Spinner className={styles.spinner} />}
      {!loading && icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </>
  );

  if (link)
    return (
      <Link onClick={onClick} className={btnStyles} to={link}>
        {content}
      </Link>
    );
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={btnStyles}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  link: PropTypes.string,
  icon: PropTypes.element,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};
Button.defaultProps = {
  className: null,
  variant: 'filled',
  color: 'primary',
  link: null,
  icon: null,
  disabled: false,
  loading: false,
  type: 'button',
  onClick: () => {},
};

export default Button;
