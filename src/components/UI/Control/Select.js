import Chevron from "./ControlComponents/Chevron.svg";
import ControlWrapper from "./ControlComponents/ControlWrapper";
import styles from "./Select.module.css";

const Select = ({
  invalid,
  label,
  feedback,
  className,
  options,
  focusRef,
  ...props
}) => {
  props.ref = focusRef;
  const selectStyle = { backgroundImage: `url(${Chevron})` };

  if (!options || options.length === 0)
    console.error("No options supplied to Select.js UI component!");

  return (
    <ControlWrapper
      id={props.id}
      invalid={invalid}
      label={label}
      feedback={feedback}
      className={className}
    >
      <select className={styles.select} style={selectStyle} {...props}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </ControlWrapper>
  );
};

export default Select;
