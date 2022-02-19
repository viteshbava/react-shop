import styles from "./CartButton.module.css";
import Button from "../UI/Button/Button";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import Badge from "../UI/Badge/Badge";
import { NavLink } from "react-router-dom";

const CartButton = ({ variant = "button", className }) => {
  const cartTotalQty = 66;

  switch (variant) {
    case "button":
      return (
        <Button variant={cartTotalQty === 0 && "outlined"} link="/cart">
          <Icon icon={ICON_TYPE.CART} />
          Cart ({cartTotalQty === null ? "SP!" : cartTotalQty})
        </Button>
      );
    case "link":
      return (
        <NavLink to={"/cart"} className={className}>
          <Icon icon={ICON_TYPE.CART} />
          Cart ({cartTotalQty === null ? "SP!" : cartTotalQty})
        </NavLink>
      );
    case "icon":
      const classes = styles["cart-icon"] + (className ? ` ${className}` : "");
      return (
        <NavLink to={"/cart"}>
          <Icon icon={ICON_TYPE.CART} />
          <Badge className={styles["qty-badge"]}>{cartTotalQty}</Badge>
        </NavLink>
      );

    default:
      console.error(`Invalid variant passed to CartButton: ${variant}`);
      return;
  }
};

export default CartButton;
