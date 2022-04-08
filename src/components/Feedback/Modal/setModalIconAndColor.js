import { ICON_TYPE } from '../../UI/Icon/Icon';

const setModalIconAndColor = (modalVariant) => {
  let color;
  let icon;

  switch (modalVariant) {
    case 'default':
      color = 'primary';
      break;
    case 'info':
      icon = ICON_TYPE.INFO;
      color = 'info';
      break;
    case 'error':
      icon = ICON_TYPE.ERROR;
      color = 'error';
      break;
    case 'success':
      icon = ICON_TYPE.SUCCESS;
      color = 'success';
      break;
    case 'warning':
      icon = ICON_TYPE.WARNING;
      color = 'warning';
      break;
    default:
      console.error(`Unknown modal modal supplied: ${modalVariant}`);
      break;
  }
  return { color, icon };
};

export default setModalIconAndColor;
