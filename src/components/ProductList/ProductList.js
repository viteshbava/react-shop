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

  console.log(products);

  let productList;

  if (products.length > 0) {
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
