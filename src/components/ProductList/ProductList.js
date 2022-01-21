import React, { useState, useEffect } from "react";
import ProductListItem from "./ProductListItem";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import useHttp from "../../hooks/use-http";
import { URL } from "../../config/config";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const { isLoading, error, sendRequest: getProducts } = useHttp();

  useEffect(() => {
    console.log("Fetching products from API...");
    getProducts({ url: URL.PRODUCTS }, (returnedProducts) =>
      setProducts(returnedProducts)
    );
  }, [getProducts]);

  return (
    <section>
      <SectionHeading>Products</SectionHeading>
      <ul className={styles["grid-wrapper"]}>
        {products.map((p) => (
          <ProductListItem product={p} />
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
