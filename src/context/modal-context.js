import React, { useState } from "react";

const ModalContext = React.createContext({
  show: false,
  props: null,
  showModal: () => {},
  hideModal: () => {},
});

const ModalContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [props, setProps] = useState(null);

  const showModal = (props) => {
    setShow(true);
    setProps(props);
  };

  const hideModal = () => {
    setShow(false);
    setProps(null);
  };

  return (
    <ModalContext.Provider value={{ show, props, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
export { ModalContextProvider };
