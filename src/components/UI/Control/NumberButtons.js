import { useState } from "react";
import ControlWrapper from "./ControlComponents/ControlWrapper";
import styles from "./NumberButtons.module.css";

const NumberButtons = ({
  invalid,
  label,
  feedback,
  className,
  focusRef,
  defaultValue,
  ...props
}) => {
  const [value, setValue] = useState(defaultValue);
  props.ref = focusRef;

  let classes = styles["number-wrapper"];
  if (invalid) classes += ` ${styles["number-wrapper--invalid"]}`;

  const valChangeHanlder = (e) => {
    setValue(e.target.value);
  };

  const decrHandler = () => {
    if (value > props.min) setValue(value - 1);
  };

  const incrHandler = () => {
    setValue(value + 1);
  };

  return (
    <ControlWrapper
      id={props.id}
      invalid={invalid}
      label={label}
      feedback={feedback}
      className={className}
    >
      <div className={classes}>
        <button
          onClick={decrHandler}
          type="button"
          className={styles["number__minus"]}
        >
          -
        </button>
        <input
          type="number"
          value={value}
          onChange={valChangeHanlder}
          {...props}
        />
        <button
          onClick={incrHandler}
          type="button"
          className={styles["number__plus"]}
        >
          +
        </button>
      </div>
    </ControlWrapper>
  );
};

export default NumberButtons;
