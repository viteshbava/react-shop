import React from "react";
import ProductListItem from "./ProductListItem";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import styles from "./ProductList.module.css";

const ProductList = () => {
  return (
    <section>
      <SectionHeading>Products</SectionHeading>
      <div className={styles["grid-wrapper"]}>
        <ProductListItem url="https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg" />
        <ProductListItem url="https://www.vishopper.com/images/products/maxxmax/PL/1090_cut-out-tall-and-thin-pine-tree.jpg" />
        <ProductListItem url="https://www.appears-itn.eu/wp-content/uploads/2018/07/long.jpg" />
        <ProductListItem url="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg" />
        <ProductListItem url="https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg" />
        <ProductListItem url="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" />
      </div>
    </section>
  );
};

export default ProductList;
