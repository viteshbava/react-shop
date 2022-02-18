import { useState, useEffect } from "react";
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

  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setInitialRender(false);
    dispatch(fetchProducts());
  }, []);

  const getProductListContent = () => {
    if (initialRender) return <></>;
    if (isLoading)
      return (
        <>
          <SectionHeading>Products</SectionHeading>
          <Spinner />
        </>
      );

    if (error)
      return (
        <InfoError
          type={INFO_ERROR_TYPE.ERROR}
          heading="Error Fetching Products!"
          message={error.message}
        />
      );

    if (!products || !products.length) {
      console.log("NO PRODUCTS TO SHOW INFO!");
      return (
        <InfoError
          type={INFO_ERROR_TYPE.INFO}
          heading="No Products to Show!"
          message="Please try again later."
        />
      );
    }

    return (
      <>
        <SectionHeading>Products</SectionHeading>
        <ul className={styles["grid-wrapper"]}>
          {products.map((p) => (
            <ProductListItem key={p.id} product={p} />
          ))}
        </ul>
      </>
    );
  };

  return <section>{getProductListContent()}</section>;
};

export default ProductList;
