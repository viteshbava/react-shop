// inputs (text, numbers etc), text areas, select drop downs

import React from "react";
import styles from "./Control.module.css";
import Chevron from "./Chevron.svg";
import Button, { BTN_TYPE } from "../Button/Button";

const CONTROL_TYPE = {
  INPUT: "input",
  TEXTAREA: "textarea",
  SELECT: "select",
  NUMBER: "number",
};

const Control = ({
  className,
  type,
  label,
  options,
  attributes,
  focusRef,
  invalid,
  feedback,
  selected,
}) => {
  let wrapperStyles = styles["wrapper"];
  if (className) wrapperStyles += ` ${className}`;
  if (invalid) wrapperStyles += ` ${styles["wrapper--invalid"]}`;

  let control;
  switch (type) {
    case CONTROL_TYPE.INPUT:
      control = (
        <input ref={focusRef} className={styles["input"]} {...attributes} />
      );
      break;
    case CONTROL_TYPE.TEXTAREA:
      console.error("Have not built the text area type yet!");
      break;
    case CONTROL_TYPE.SELECT:
      const backgroundImage = { backgroundImage: `url(${Chevron})` };
      control = (
        <select
          ref={focusRef}
          style={backgroundImage}
          className={styles["select"]}
          {...attributes}
          defaultValue={selected}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
      break;
    case CONTROL_TYPE.NUMBER:
      control = (
        <div className={styles["number-wrapper"]}>
          <button type="button" className={styles["number__minus"]}>
            -
          </button>
          <input
            type={"number"}
            ref={focusRef}
            className={styles["input"]}
            {...attributes}
          />
          <button type="button" className={styles["number__plus"]}>
            +
          </button>
        </div>
      );
      break;
    default:
      console.error("Invalid control type!");
      break;
  }
  return (
    <div className={wrapperStyles}>
      <label className={styles["label"]} htmlFor={attributes.id}>
        {label}
      </label>
      {control}
      {feedback && <p className={styles.feedback}>{feedback}</p>}
    </div>
  );
};

export default Control;
export { CONTROL_TYPE };
