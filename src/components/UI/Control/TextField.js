import ControlWrapper from "./ControlComponents/ControlWrapper";
import styles from "./TextField.module.css";

const TextField = ({
  invalid,
  label,
  feedback,
  className,
  focusRef,
  ...props
}) => {
  props.ref = focusRef;

  return (
    <ControlWrapper
      id={props.id}
      invalid={invalid}
      label={label}
      feedback={feedback}
      className={className}
    >
      <input type="text" {...props} />
    </ControlWrapper>
  );
};

export default TextField;
