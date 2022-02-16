import React from "react";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import Badge from "../UI/Badge/Badge";
import { Link } from "react-router-dom";
import styles from "./NavMobileRight.module.css";
import { useSelector } from "react-redux";

const NavMobileRight = ({ className }) => {
  const { isLoading, totalQuantity } = useSelector((state) => state.cart);
  const navClasses = styles.wrapper + (className ? ` ${className}` : "");

  return (
    <nav className={navClasses}>
      <Link className={styles["cart-icon"]} to={"/cart"}>
        <Icon icon={ICON_TYPE.CART} />
        <Badge className={styles["qty-badge"]}>{totalQuantity}</Badge>
      </Link>
    </nav>
  );
};

export default NavMobileRight;
