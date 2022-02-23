import styles from "./Help.module.css";
import HelpText_1 from "./HelpText_one";
import HelpText_2 from "./HelpText_two";
import { Routes, Route } from "react-router-dom";
import SectionHeading from "../../components/UI/SectionHeading/SectionHeading";
import Button from "../../components/UI/Button/Button";

const Help = () => {
  return (
    <section className={styles.wrapper}>
      <SectionHeading>Help</SectionHeading>
      <div className={styles.intro}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
      <nav className={styles["help-nav"]}>
        <Button link={"help1"}>Help Text 1</Button>
        <Button link={"help2"}>Help Text 2</Button>
      </nav>
      <Routes>
        <Route path="help1" element={<HelpText_1 />} />
        <Route path="help2" element={<HelpText_2 />} />
        <Route index element={<></>} />
        <Route path="*" element={<div>Help text not found!</div>} />
      </Routes>
    </section>
  );
};

export default Help;
