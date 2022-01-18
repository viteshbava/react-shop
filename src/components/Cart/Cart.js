import React from "react";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import CartItem from "./CartItem";
import CartOrderSummary from "./CartOrderSummary";
import styles from "./Cart.module.css";

const Cart = () => {
  return (
    <section>
      <SectionHeading>Cart (3)</SectionHeading>
      <div className={styles["grid-wrapper"]}>
        <ul className={styles["item-list"]}>
          <CartItem url="https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg" />
          <CartItem url="https://www.vishopper.com/images/products/maxxmax/PL/1090_cut-out-tall-and-thin-pine-tree.jpg" />
          <CartItem url="https://www.appears-itn.eu/wp-content/uploads/2018/07/long.jpg" />
          <CartItem url="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg" />
          <CartItem url="https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg" />
          <CartItem url="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" />
        </ul>
        <CartOrderSummary />
      </div>
    </section>
  );
};

export default Cart;
