import React from "react";
import ProductListItem from "./ProductListItem";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import { useGetProducts } from "../../hooks/use-api";
import InfoError, { INFO_ERROR_TYPE } from "../Error/InfoError";
import Spinner from "../UI/Spinner/Spinner";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const { isLoading, error, products } = useGetProducts();

  let content;

  if (isLoading) {
    content = (
      <>
        <SectionHeading>Products</SectionHeading>
        <Spinner />
      </>
    );
  } else if (error) {
    content = (
      <InfoError
        type={INFO_ERROR_TYPE.ERROR}
        heading="Error Fetching Products!"
        message={error}
      />
    );
  } else if (!products || (products && !products.length)) {
    content = (
      <InfoError
        type={INFO_ERROR_TYPE.INFO}
        heading="No Products to Show!"
        message="Please try again later."
      />
    );
  } else if (products && products.length > 0) {
    content = (
      <>
        <SectionHeading>Products</SectionHeading>
        <ul className={styles["grid-wrapper"]}>
          {products.map((p) => (
            <ProductListItem key={p.id} product={p} />
          ))}
        </ul>
      </>
    );
  }

  return <section>{content}</section>;
};

export default ProductList;
