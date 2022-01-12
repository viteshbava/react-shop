import React from "react";
import styles from "./SectionHeading.module.css";

const SectionHeading = ({ children }) => {
  return <h1 className={styles.heading}>{children}</h1>;
};

export default SectionHeading;
