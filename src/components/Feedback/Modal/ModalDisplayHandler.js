import { useContext, useState, useEffect } from 'react';
import ModalContext from '../../../context/modal-context';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';
import Modal from './Modal';
import Animate from '../../UI/Animate/Animate';
import styles from './ModalDisplayHandler.module.css';

const ModalDisplayHandler = () => {
  const { show, props: modalPropsCtx, hideModal } = useContext(ModalContext);
  const [modalProps, setModalProps] = useState(null);

  // If we are dealing with a custom modal, check we have custom content
  if (modalPropsCtx?.type === 'custom' && !modalPropsCtx?.customContent) {
    const errorMsg = 'customContent must be supplied for a custom modal type!';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  // If the modal is exiting, we wish to retain the props that were cleared in context state during hideModal, so we can keep showing the modal while it is fading out, eventhough context state has cleared it.  Therefore we store/retain these in modalProps
  useEffect(() => {
    if (show && modalPropsCtx) setModalProps(modalPropsCtx);
  }, [show, modalPropsCtx]);

  // If we have no modalProps to display, return nothing
  if (!modalProps) return null;

  // set content of modal using modalProps
  let content;
  if (modalProps.type === 'custom') content = modalProps.customContent;
  else content = <Modal modalProps={modalProps} closeModal={hideModal} />;

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
        {content}
      </Animate>
    </FullScreenOverlay>
  );
};

export default ModalDisplayHandler;
