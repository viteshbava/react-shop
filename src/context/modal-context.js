import React, { useState } from "react";

const ModalContext = React.createContext({
  show: false,
  props: {},
  showModal: () => {},
  hideModal: () => {},
});

const ModalContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [props, setProps] = useState({});

  const showModal = (props) => {
    setShow(true);
    setProps(props);
  };

  const hideModal = () => {
    setShow(false);
  };

  return (
    <ModalContext.Provider value={{ show, props, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
export { ModalContextProvider };
