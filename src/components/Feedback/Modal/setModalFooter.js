import Button from '../../UI/Button/Button';

const setModalFooter = ({
  type,
  color,
  onOkayHandler,
  onConfirm,
  onCancelHandler,
  cancelText,
  okText,
}) => {
  let errorMsg;
  switch (type) {
    case 'alert':
      return (
        <Button color={color} onClick={onOkayHandler}>
          {okText}
        </Button>
      );
    case 'confirm':
      if (!onConfirm) {
        errorMsg = 'Confirm modal has not received a onConfirm action!';
        console.error(errorMsg);
        throw new Error(errorMsg);
      }
      return (
        <>
          <Button onClick={onCancelHandler} variant="outlined" color={color}>
            {cancelText}
          </Button>
          <Button color={color} onClick={onOkayHandler}>
            {okText}
          </Button>
        </>
      );
    default:
      errorMsg = `Unknown modal type: ${type}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
  }
};

export default setModalFooter;
