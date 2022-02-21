import { useContext } from "react";

import ModalContext from "../../context/modal-context";
import { useSelector } from "react-redux";

import FloatingAlerts from "./Alert/FloatingAlerts";
import FullScreenLoader from "./FullScreenLoader/FullScreenLoader";
import Modal from "./Modal/Modal";

const Feedback = () => {
  const isLoading = useSelector((state) => state.ui.loading);
  const { alerts } = useSelector((state) => state.ui.alerts);

  const modal = useContext(ModalContext);
  return (
    <>
      {modal.show && modal.props && <Modal {...modal.props} />}
      {isLoading && <FullScreenLoader />}
      {alerts.length > 0 && <FloatingAlerts alerts={alerts} />}
    </>
  );
};

export default Feedback;
