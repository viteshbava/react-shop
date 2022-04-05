import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalContext from '../../../context/modal-context';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';
import Modal from './Modal';

const ModalDisplayHandler = () => {
  const { show, props, hideModal } = useContext(ModalContext);
  const [modalProps, setModalProps] = useState(props);

  // If the modal is exiting, we wish to retain the props that were cleared in context state during hideModal.  Therefore we store/retain these in modalProps
  useEffect(() => {
    if (show && props) setModalProps(props);
  }, [show, props]);

  return (
    <FullScreenOverlay show={show} onClose={hideModal}>
      <Modal modalProps={modalProps} closeModal={hideModal} />
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
