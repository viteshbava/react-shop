import React, { useMemo, useState } from 'react';
import ModalProps from '../models/modalProps';

interface ModalContextTypes {
  show: boolean;
  props: ModalProps | null;
  showModal: (modalProps: ModalProps) => void;
  hideModal: () => void;
}

const ModalContext = React.createContext<ModalContextTypes>({
  show: false,
  props: null,
  showModal: () => {},
  hideModal: () => {},
});

const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [show, setShow] = useState(false);
  const [props, setProps] = useState<ModalProps | null>(null);

  const showModal = (modalProps: ModalProps) => {
    setShow(true);
    setProps(modalProps);
  };

  const hideModal = () => {
    setShow(false);
    setProps(null);
  };

  const providerValues: ModalContextTypes = useMemo(
    () => ({ show, props, showModal, hideModal }),
    [show, props]
  );

  return (
    <ModalContext.Provider value={providerValues}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
export { ModalContextProvider };
