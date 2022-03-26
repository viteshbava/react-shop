import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Logo.module.css';

const Logo = ({ onClick }) => (
  <Link onClick={onClick} className={styles['logo-link']} to="/">
    <span className={styles['logo-link__text']}>React Shop</span>
  </Link>
);

Logo.propTypes = {
  onClick: PropTypes.func,
};

Logo.defaultProps = {
  onClick: () => {},
};

export default Logo;
