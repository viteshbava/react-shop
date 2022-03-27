import { useState } from 'react';
import PropTypes from 'prop-types';
import ControlWrapper from './ControlComponents/ControlWrapper';
import styles from './NumberButtons.module.css';

const NumberButtons = ({
  id,
  invalid,
  label,
  feedback,
  className,
  focusRef,
  value: currVal,
  onUpdate,
  min,
  max,
}) => {
  const [value, setValue] = useState(currVal);

  let classes = styles['number-wrapper'];
  if (invalid) classes += ` ${styles['number-wrapper--invalid']}`;

  const inputChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const undoChange = () => setValue(currVal);

  // if an onUpdate function is provided to this Control, the Control will call that function upon value change and provide to arguments: the new value (newVal), and a function that can be used to undo the change back to original value (undoChange). undoChange could, for example, be used in an error callback.
  const changeHandler = (newVal) => {
    setValue(newVal);
    if (onUpdate) onUpdate(newVal, undoChange);
  };

  const inputBlurHandler = (e) => {
    if (!e.target.value) {
      setValue(currVal);
    } else {
      const val = +e.target.value;
      if (val === currVal) return;
      const valLessThanMin = min !== null && val < min;
      const valGreaterThanMax = max !== null && val > max;
      if (valLessThanMin || valGreaterThanMax) {
        setValue(currVal);
        return;
      }
      changeHandler(val);
    }
  };

  const decrBtnHandler = () => {
    if (min !== null && value === min) return;
    changeHandler(value - 1);
  };

  const incrBtnHandler = () => {
    if (max !== null && value === max) return;
    changeHandler(value + 1);
  };

  return (
    <ControlWrapper
      id={id}
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
            styles.number__minus +
            (min !== null && value <= min
              ? ` ${styles['number--read-only']}`
              : '')
          }
        >
          -
        </button>
        <input
          id={id}
          type="number"
          value={value}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          ref={focusRef}
          min={min}
          max={max}
        />
        <button
          onClick={incrBtnHandler}
          type="button"
          className={
            styles.number__plus +
            (max !== null && value >= max
              ? ` ${styles['number--read-only']}`
              : '')
          }
        >
          +
        </button>
      </div>
    </ControlWrapper>
  );
};

NumberButtons.propTypes = {
  id: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  label: PropTypes.string.isRequired,
  feedback: PropTypes.string,
  className: PropTypes.string,
  focusRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]),
  value: PropTypes.number,
  onUpdate: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
};
NumberButtons.defaultProps = {
  invalid: false,
  feedback: null,
  className: null,
  focusRef: null,
  value: null,
  onUpdate: () => {},
  min: null,
  max: null,
};

export default NumberButtons;
