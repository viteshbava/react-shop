import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const ModalContext = React.createContext({
  show: false,
  props: null,
  showModal: () => {},
  hideModal: () => {},
});

const ModalContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [props, setProps] = useState(null);

  const showModal = (modalProps) => {
    setShow(true);
    setProps(modalProps);
  };

  const hideModal = () => {
    setShow(false);
    setProps(null);
  };

  const providerValues = useMemo(
    () => ({ show, props, showModal, hideModal }),
    [show, props]
  );

  return (
    <ModalContext.Provider value={providerValues}>
      {children}
    </ModalContext.Provider>
  );
};

ModalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalContext;
export { ModalContextProvider };
