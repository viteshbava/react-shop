import React from "react";
import ProductListItem from "./ProductListItem";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import styles from "./ProductList.module.css";

const ProductList = () => {
  return (
    <section>
      <SectionHeading>Products</SectionHeading>
      <div className={styles["grid-wrapper"]}>
        <ProductListItem />
        <ProductListItem />
        <ProductListItem />
        <ProductListItem />
        <ProductListItem />
        <ProductListItem />
      </div>
    </section>
  );
};

export default ProductList;
