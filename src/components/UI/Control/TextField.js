/* Includes type = text, password, email */

import Control, { CONTROL_TYPE } from "./Control";
import styles from "./TextField.module.css";

const TextField = (props) => {
  return <Control type={CONTROL_TYPE.INPUT} {...props} />;
};

export default TextField;
