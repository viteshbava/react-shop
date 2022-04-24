import styles from './Modal.module.css';
import setModalIconAndColor from './setModalIconAndColor';
import setModalFooter from './setModalFooter';
import Card from '../../UI/Card/Card';
import Icon from '../../UI/Icon/Icon';
import ModalProps from '../../../models/modalProps';

const Modal = ({
  modalProps,
  closeModal,
  className = null,
}: {
  modalProps: ModalProps;
  closeModal: () => void;
  className?: string | null;
}) => {
  const {
    type,
    variant = 'default',
    title = '',
    body = '',
    cancelText = 'Cancel',
    okText = 'Okay',
    onCancel,
    onConfirm,
  } = modalProps;

  const { color, icon } = setModalIconAndColor(variant);

  const onCancelHandler = () => {
    closeModal();
    if (onCancel) onCancel();
  };

  const onOkayHandler = () => {
    closeModal();
    if (onConfirm) onConfirm();
  };

  const footer = setModalFooter({
    type,
    color,
    onOkayHandler,
    onConfirm,
    onCancelHandler,
    cancelText,
    okText,
  });

  let cardClasses = styles.wrapper;
  cardClasses += ` ${styles[`wrapper--${color}`]}`;
  if (className) cardClasses += ` ${className}`;

  return (
    <Card className={cardClasses}>
      <button
        type="button"
        onClick={closeModal}
        className={styles['close-button']}
      >
        &times;
      </button>
      <div className={styles.header}>
        {icon && <Icon icon={icon} className={styles.header__icon} />}
        <h2 className={styles.header__title}>{title}</h2>
      </div>
      <div className={styles.body}>{body}</div>
      <div className={styles.actions}>{footer}</div>
    </Card>
  );
};

// Here to remove eslint error react/require-default-props
Modal.defaultProps = {
  className: null,
};

export default Modal;
