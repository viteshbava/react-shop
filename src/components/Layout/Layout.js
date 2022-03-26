import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = ({ children }) => (
  <>
    <Header />
    <main className={styles.main}>
      <div className="container">{children}</div>
    </main>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
