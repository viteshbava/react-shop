import ProductListItem from "./ProductListItem";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import InfoError, { INFO_ERROR_TYPE } from "../Error/InfoError";
import PageLoader from "../Feedback/PageLoader/PageLoader";
import styles from "./ProductList.module.css";
import { useSelector } from "react-redux";

const ProductList = () => {
  const { isLoading, hasLoaded, error, products } = useSelector(
    (state) => state.products
  );

  const getProductListContent = () => {
    if (isLoading || !hasLoaded)
      return (
        <>
          <SectionHeading>Products</SectionHeading>
          <PageLoader />
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
