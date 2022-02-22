import styles from "./Layout.module.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Feedback from "../Feedback/Feedback";

const Layout = ({ children }) => {
  return (
    <>
      <Feedback />
      <Header />
      <main className={styles.main}>
        <div className="container">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
