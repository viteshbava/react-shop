import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalContext from '../../../context/modal-context';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';
import Modal from './Modal';
import Animate from '../../UI/Animate/Animate';
import styles from './ModalDisplayHandler.module.css';

const ModalDisplayHandler = () => {
  const { show, props, hideModal } = useContext(ModalContext);
  const [modalProps, setModalProps] = useState(props);

  // If we are dealing with a custom modal, return the custom modal content supplied
  if (modalProps?.type === 'custom' && !modalProps?.customContent) {
    const errorMsg = 'customContent must be supplied for a custom modal type!';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  // If the modal is exiting, we wish to retain the props that were cleared in context state during hideModal.  Therefore we store/retain these in modalProps
  useEffect(() => {
    if (show && props) setModalProps(props);
  }, [show, props]);

  return (
    <FullScreenOverlay show={show} onClose={hideModal}>
      <Animate
        isMounted={show}
        enterTime={200}
        exitTime={200}
        animation={{
          enter: styles['enter-animate'],
          exit: styles['exit-animate'],
        }}
        type="slide-from-top"
      >
        {modalProps?.type === 'custom' ? (
          modalProps.customContent
        ) : (
          <Modal modalProps={modalProps} closeModal={hideModal} />
        )}
      </Animate>
    </FullScreenOverlay>
  );
};

// ModalDisplayHandler.propTypes = {
//   modal: PropTypes.shape({
//     type: PropTypes.string.isRequired,
//     variant: PropTypes.string,
//     title: PropTypes.string,
//     body: PropTypes.string,
//     cancelText: PropTypes.string,
//     okText: PropTypes.string,
//     onCancel: PropTypes.func,
//     onConfirm: PropTypes.func,
//     customContent: PropTypes.element,
//   }).isRequired,
// };

export default ModalDisplayHandler;
