import PropTypes from 'prop-types';
import ControlWrapper from './ControlComponents/ControlWrapper';

const TextField = ({
  id,
  invalid,
  label,
  feedback,
  type,
  className,
  focusRef,
  placeholder,
  onChange,
  onBlur,
}) => (
  <ControlWrapper
    id={id}
    invalid={invalid}
    label={label}
    feedback={feedback}
    className={className}
  >
    <input
      id={id}
      ref={focusRef}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
  </ControlWrapper>
);

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  label: PropTypes.string.isRequired,
  feedback: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  focusRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};
TextField.defaultProps = {
  invalid: false,
  feedback: null,
  className: null,
  type: 'text',
  focusRef: null,
  placeholder: null,
  onChange: () => {},
  onBlur: () => {},
};

export default TextField;
