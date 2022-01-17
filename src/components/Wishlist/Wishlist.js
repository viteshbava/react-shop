import React from "react";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import WishlistItem from "./WishlistItem";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
  return (
    <section>
      <SectionHeading>Wishlist (3)</SectionHeading>
      <div className={styles["item-list"]}>
        <WishlistItem url="https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg" />
        <WishlistItem url="https://www.vishopper.com/images/products/maxxmax/PL/1090_cut-out-tall-and-thin-pine-tree.jpg" />
        <WishlistItem url="https://www.appears-itn.eu/wp-content/uploads/2018/07/long.jpg" />
        <WishlistItem url="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg" />
        <WishlistItem url="https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg" />
        <WishlistItem url="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" />
      </div>
    </section>
  );
};

export default Wishlist;
