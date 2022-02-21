import styles from "./Help.module.css";

import SectionHeading from "../../components/UI/SectionHeading/SectionHeading";
import Button from "../../components/UI/Button/Button";

import { Routes, Route } from "react-router-dom";

const HelpText_1 = () => (
  <>
    <br />
    <h2>Help Text 1</h2>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
  </>
);
const HelpText_2 = () => (
  <>
    <br />
    <h2>Help Text 2</h2>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
  </>
);

const Help = () => {
  return (
    <section>
      <SectionHeading>Help</SectionHeading>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <div className={styles["help-buttons"]}>
        <Button>Help Text 1</Button>
        <Button>Help Text 2</Button>
      </div>
      <Routes>
        <Route path="/help/more" element={<HelpText_1 />} />
      </Routes>
    </section>
  );
};

export default Help;
