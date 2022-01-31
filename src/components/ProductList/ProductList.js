import { useEffect } from "react";
import ProductListItem from "./ProductListItem";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import InfoError, { INFO_ERROR_TYPE } from "../Error/InfoError";
import Spinner from "../UI/Spinner/Spinner";
import styles from "./ProductList.module.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/product-actions";

const ProductList = () => {
  const { isLoading, error, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

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
        message={error.message}
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
