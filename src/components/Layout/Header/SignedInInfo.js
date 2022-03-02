import styles from "./SignedInInfo.module.css";
import { useSelector } from "react-redux";

const trimText = (text, maxLength = 21) =>
  text.length > maxLength ? text.substring(0, maxLength + 1) + " ..." : text;

const SignedInInfo = ({ className }) => {
  const { email } = useSelector((state) => state.auth.user);
  const classes = styles.wrapper + (className ? ` ${className}` : "");
  return (
    <div className={classes}>
      <div className={styles.label}>Signed in as</div>
      <div className={styles.username}>{trimText(email)}</div>
    </div>
  );
};

export default SignedInInfo;
