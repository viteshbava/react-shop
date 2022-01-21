import React, { useEffect, useState } from "react";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import AddToCartSummary from "../AddToCartSummary/AddToCartSummary";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import Control, { CONTROL_TYPE } from "../UI/Control/Control";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import { useParams } from "react-router-dom";
import { URL } from "../../config/config";
import useHttp from "../../hooks/use-http";
import toDollars from "../../utilities/toDollars";
import styles from "./ProductSingle.module.css";

const ProductSingle = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { isLoading, error, sendRequest: getProduct } = useHttp();

  useEffect(() => {
    console.log("Fetching product from API...");
    getProduct({ url: `${URL.PRODUCTS}/${id}` }, (returnedProduct) =>
      setProduct(returnedProduct)
    );
  }, [getProduct]);

  let productDetails;
  if (product) {
    const { title, price, category, description, image } = product;
    productDetails = (
      <>
        <SectionHeading>{title}</SectionHeading>
        <div className={styles["grid-wrapper"]}>
          <div className={styles["image-wrapper"]}>
            <Icon
              className={styles["wishlist-toggle"]}
              icon={ICON_TYPE.HEART_EMPTY}
            />
            <img className={styles.image} src={image} alt="Product Image" />
          </div>
          <div className={styles["details-wrapper"]}>
            <p className={styles.category}>{category}</p>
            <p className={styles["product-id"]}>{`Product ID: ${id}`}</p>
            <p className={styles.price}>{toDollars(price)}</p>
            <p className={styles.descr}>{description}</p>
            <Control
              label="Quantity"
              type={CONTROL_TYPE.SELECT}
              options={[1, 2, 3, 4, 5]}
              attributes={{ id: "quantity" }}
            />
            <div className={styles["action-wrapper"]}>
              <Button style={BTN_TYPE.SECONDARY}>Add to Wishlist</Button>
              <Button>
                <Icon icon={ICON_TYPE.CART} />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const url = "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg";
  return (
    <section>
      {productDetails}
      {/* <AddToCartSummary /> */}
    </section>
  );
};

export default ProductSingle;
