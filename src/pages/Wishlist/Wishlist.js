import { useState, useEffect } from "react";
import SectionHeading from "../../components/UI/SectionHeading/SectionHeading";
import WishlistItem from "./WishlistItem";
import { useSelector } from "react-redux";
import InfoError, { INFO_ERROR_TYPE } from "../../components/Error/InfoError";
import PageLoader from "../../components/UI/PageLoader/PageLoader";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
  const { isLoading, error, products, totalQuantity } = useSelector(
    (state) => state.wishlist
  );

  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setInitialRender(false);
  }, []);

  const getWishlistContent = () => {
    if (initialRender) return <></>;
    if (isLoading)
      return (
        <>
          <SectionHeading>Wishlist</SectionHeading>
          <PageLoader />
        </>
      );

    if (error)
      return (
        <InfoError
          type={INFO_ERROR_TYPE.ERROR}
          heading="Error Fetching Wishlist!"
          message={error.message}
        />
      );

    if (!products || (products && !products.length)) {
      return (
        <InfoError
          type={INFO_ERROR_TYPE.INFO}
          heading="Your Wishlist is Empty!"
          message="Feel free to add products to your wishlist to purchase later!"
        />
      );
    }

    return (
      <>
        <SectionHeading>Wishlist ({totalQuantity})</SectionHeading>
        <ul className={styles["item-list"]}>
          {products.map((p) => (
            <WishlistItem key={p.id} product={p} />
          ))}
        </ul>
      </>
    );
  };

  return <section>{getWishlistContent()}</section>;
};

export default Wishlist;
