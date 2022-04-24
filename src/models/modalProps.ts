interface ModalProps {
  type: 'alert' | 'confirm' | 'custom';
  variant?: 'default' | 'info' | 'error' | 'success' | 'warning';
  title?: string;
  body?: string;
  cancelText?: string;
  okText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  customContent?: React.ReactNode;
}

export default ModalProps;
