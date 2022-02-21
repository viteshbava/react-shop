import styles from "./Layout.module.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Feedback from "../Feedback/Feedback";
import ScrollToTop from "../../utilities/ScrollToTop";

const Layout = ({ children }) => {
  return (
    <>
      <ScrollToTop />
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
