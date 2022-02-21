import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={`container ${styles.wrapper}`}>
        © 2022 React Shop, Ltd. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
