import PropTypes from 'prop-types';
import styles from './NavTopLeft.module.css';
import Hamburger from '../../UI/Hamburger/Hamburger';
import Logo from './Logo';

const NavTopLeft = ({ className, hamburgerClickHandler }) => {
  const navClasses = styles.wrapper + (className ? ` ${className}` : '');

  return (
    <nav className={navClasses}>
      <div className={styles['hamburger-display-control']}>
        <Hamburger
          className={styles.hamburger}
          onClick={hamburgerClickHandler}
        />
      </div>
      <Logo />
    </nav>
  );
};

NavTopLeft.propTypes = {
  className: PropTypes.string,
  hamburgerClickHandler: PropTypes.func,
};
NavTopLeft.defaultProps = {
  className: null,
  hamburgerClickHandler: () => {},
};

export default NavTopLeft;
