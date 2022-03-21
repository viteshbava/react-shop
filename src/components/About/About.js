import SectionHeading from "../../components/UI/SectionHeading/SectionHeading";
import styles from "./About.module.css";
import Button from "../../components/UI/Button/Button";
import { Outlet } from "react-router-dom";

const About = () => {
  return (
    <section className={styles.wrapper}>
      <SectionHeading>About</SectionHeading>
      <div className={styles.intro}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
      <nav className={styles["about-nav"]}>
        <Button link={"about1"}>About Text 1</Button>
        <Button link={"about2"}>About Text 2</Button>
      </nav>
      <Outlet />
    </section>
  );
};

export default About;
