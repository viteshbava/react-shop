import ControlWrapper from "./ControlComponents/ControlWrapper";
import styles from "./NumberButtons.module.css";

const NumberButtons = ({
  invalid,
  label,
  feedback,
  className,
  focusRef,
  ...props
}) => {
  props.ref = focusRef;
  let classes = styles["number-wrapper"];
  if (className) classes += ` ${className}`;
  return (
    <ControlWrapper
      id={props.id}
      invalid={invalid}
      label={label}
      feedback={feedback}
      className={classes}
    >
      <button type="button" className={styles["number__minus"]}>
        -
      </button>
      <input type="number" {...props} />
      <button type="button" className={styles["number__plus"]}>
        +
      </button>
    </ControlWrapper>
  );
};

export default NumberButtons;
