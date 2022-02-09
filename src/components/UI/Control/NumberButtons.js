import { useState } from "react";
import ControlWrapper from "./ControlComponents/ControlWrapper";
import styles from "./NumberButtons.module.css";

const NumberButtons = ({
  invalid,
  label,
  feedback,
  className,
  focusRef,
  value: currVal,
  onUpdate,
  ...props
}) => {
  const [value, setValue] = useState(currVal);
  props.ref = focusRef;

  let classes = styles["number-wrapper"];
  if (invalid) classes += ` ${styles["number-wrapper--invalid"]}`;

  const inputChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const inputBlurHandler = (e) => {
    if (!e.target.value) {
      setValue(currVal);
    } else {
      const val = +e.target.value;
      if (props.min && val < props.min) return;
      if (props.max && val > props.max) return;
      changeHandler(val);
    }
  };

  const decrBtnHandler = () => {
    if (props.min && value == props.min) return;
    changeHandler(value - 1);
  };

  const incrBtnHandler = () => {
    if (props.max && value == props.max) return;
    changeHandler(value + 1);
  };

  const changeHandler = (newVal) => {
    if (onUpdate) onUpdate(newVal);
    setValue(newVal);
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
          onClick={decrBtnHandler}
          type="button"
          className={styles["number__minus"]}
        >
          -
        </button>
        <input
          type="number"
          value={value}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          {...props}
        />
        <button
          onClick={incrBtnHandler}
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
