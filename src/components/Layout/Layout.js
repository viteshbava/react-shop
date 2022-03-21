import styles from "./Layout.module.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
