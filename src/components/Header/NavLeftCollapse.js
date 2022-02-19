import { useEffect } from "react";
import localStyles from "./NavLeftCollapse.module.css";
import globalStyles from "./_NavGlobal.module.css";
import ModalOverlay from "../UI/Modal/ModalOverlay";
import Logo from "./Logo";

const NavLeftCollapse = ({ close }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const overlayClickHandler = (e) => {
    if (!close) return;
    if (e.target === e.currentTarget) close();
  };

  return (
    <>
      <div onClick={overlayClickHandler} className={localStyles.overlay}></div>
      <div className={localStyles.wrapper}>
        <div className="container">
          <div className={localStyles.header}>
            <Logo />
            <button onClick={close} className={localStyles.close}>
              &times;
            </button>
          </div>

          <nav>
            <ul>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
            </ul>
            <div>Yes</div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavLeftCollapse;
