import React from "react";
import ProductListItem from "./ProductListItem";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import { useGetProducts } from "../../hooks/use-api";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const { isLoading, error, products } = useGetProducts();

  let productList;

  if (products && products.length > 0) {
    productList = (
      <ul className={styles["grid-wrapper"]}>
        {products.map((p) => (
          <ProductListItem key={p.id} product={p} />
        ))}
      </ul>
    );
  }

  return (
    <section>
      <SectionHeading>Products</SectionHeading>
      {productList}
    </section>
  );
};

export default ProductList;
