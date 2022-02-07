import { useState } from "react";
import ControlWrapper from "./ControlComponents/ControlWrapper";
import styles from "./NumberButtons.module.css";

const NumberButtons = ({
  invalid,
  label,
  feedback,
  className,
  focusRef,
  value: currVall,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(currVall);
  props.ref = focusRef;

  let classes = styles["number-wrapper"];
  if (invalid) classes += ` ${styles["number-wrapper--invalid"]}`;

  const valChangeHanlder = (e) => {
    const val = +e.target.value;
    if (props.min && val < props.min) {
      setValue(+props.min);
    } else if (props.max && val > props.max) {
      setValue(+props.max);
    } else setValue(val);
  };

  const decrHandler = () => {
    if (!props.min || (props.min && value > props.min)) setValue(value - 1);
  };

  const incrHandler = () => {
    if (!props.max || (props.max && value < props.max)) setValue(value + 1);
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
