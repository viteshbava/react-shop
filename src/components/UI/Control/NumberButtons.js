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

  // if an onUpdate function is provided to this Control, the Control will call that function upon value change and provide to arguments: the new value (newVal), and a function that can be used to undo the change back to original value (undoChange). undoChange could, for example, be used in an error callback.
  const changeHandler = (newVal) => {
    setValue(newVal);
    if (onUpdate) onUpdate(newVal, undoChange);
  };

  const undoChange = () => setValue(currVal);

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
          className={
            styles["number__minus"] +
            (value <= +props.min ? ` ${styles["number--read-only"]}` : "")
          }
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
          className={
            styles["number__plus"] +
            (value >= +props.max ? ` ${styles["number--read-only"]}` : "")
          }
        >
          +
        </button>
      </div>
    </ControlWrapper>
  );
};

export default NumberButtons;
