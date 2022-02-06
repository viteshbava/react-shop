import Chevron from "./Chevron.svg";
import Control, { CONTROL_TYPE } from "./Control";

import styles from "./Select.module.css";

const Select = ({ options, ...props }) => {
  props.attributes.style = { backgroundImage: `url(${Chevron})` };
  props.attributes.className = props.attributes.className
    ? `${props.attributes.className} ${styles["select"]}`
    : styles["select"];
  return (
    <Control type={CONTROL_TYPE.SELECT} {...props}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </Control>
  );
};

export default Select;
