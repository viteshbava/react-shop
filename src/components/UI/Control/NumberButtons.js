import Control, { CONTROL_TYPE } from "./Control";
import styles from "./NumberButtons.module.css";

const NumberButtons = (props) => {
  props.attributes.type = "number";
  return (
    <div className={styles["number-wrapper"]}>
      <button type="button" className={styles["number__minus"]}>
        -
      </button>
      <Control type={CONTROL_TYPE.INPUT} {...props} />
      <button type="button" className={styles["number__plus"]}>
        +
      </button>
    </div>
  );
};

export default NumberButtons;
