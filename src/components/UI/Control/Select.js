import PropTypes from 'prop-types';
import Chevron from './ControlComponents/Chevron.svg';
import ControlWrapper from './ControlComponents/ControlWrapper';
import styles from './Select.module.css';

const Select = ({
  id,
  invalid,
  label,
  feedback,
  className,
  options,
  focusRef,
}) => {
  const selectStyle = { backgroundImage: `url(${Chevron})` };

  if (!options || options.length === 0)
    console.error('No options supplied to Select.js UI component!');

  return (
    <ControlWrapper
      id={id}
      invalid={invalid}
      label={label}
      feedback={feedback}
      className={className}
    >
      <select className={styles.select} style={selectStyle} ref={focusRef}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </ControlWrapper>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  label: PropTypes.string.isRequired,
  feedback: PropTypes.string,
  className: PropTypes.string,
  focusRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]),
  options: PropTypes.arrayOf(PropTypes.string),
};
Select.defaultProps = {
  invalid: false,
  feedback: null,
  className: null,
  focusRef: null,
  options: [],
};

export default Select;
