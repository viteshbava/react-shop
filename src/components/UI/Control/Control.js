// inputs (text, numbers etc), text areas, select drop downs

import React from "react";
import styles from "./Control.module.css";

const CONTROL_TYPE = {
  INPUT: "input",
  TEXTAREA: "textarea",
  SELECT: "select",
};

const Control = ({ className, type, label, attributes }) => {
  let wrapperStyles = styles["control-wrapper"];
  if (className) wrapperStyles += ` ${className}`;

  let control;
  switch (type) {
    case CONTROL_TYPE.INPUT:
      control = <input className={styles["control__input"]} {...attributes} />;
      break;
    case CONTROL_TYPE.TEXTAREA:
      console.error("Have not built the text area type yet!");
      break;
    case CONTROL_TYPE.SELECT:
      control = (
        <select className={styles["control__select"]} {...attributes}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      );
      break;
    default:
      console.error("Invalid control type!");
      break;
  }

  return (
    <div className={wrapperStyles}>
      <label className={styles["control__label"]} htmlFor={attributes.id}>
        {label}
      </label>
      {control}
    </div>
  );
};

export default Control;
export { CONTROL_TYPE };
