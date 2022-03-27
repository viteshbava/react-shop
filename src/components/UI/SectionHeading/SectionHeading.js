import PropTypes from 'prop-types';
import styles from './SectionHeading.module.css';

const SectionHeading = ({ children }) => (
  <h1 className={styles.heading}>{children}</h1>
);

SectionHeading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionHeading;
