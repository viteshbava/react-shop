import SectionHeading from "../UI/SectionHeading/SectionHeading";
import AddToCartSummary from "../AddToCartSummary/AddToCartSummary";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import Control, { CONTROL_TYPE } from "../UI/Control/Control";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import { useParams } from "react-router-dom";
import useCallApi from "../../hooks/use-callApi";
import callFakeStoreAPI from "../../apis/fakeStoreAPI";
import Spinner from "../UI/Spinner/Spinner";
import InfoError, { INFO_ERROR_TYPE } from "../Error/InfoError";
import toDollars from "../../utilities/toDollars";
import styles from "./ProductSingle.module.css";

const ProductSingle = () => {
  const { id } = useParams();
  const {
    isLoading,
    error,
    result: product,
  } = useCallApi(() => callFakeStoreAPI.getProduct(id));

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (error) {
    content = (
      <InfoError
        type={INFO_ERROR_TYPE.ERROR}
        heading="Error Fetching Product!"
        message={error.message}
      />
    );
  } else if (!product) {
    content = (
      <InfoError
        type={INFO_ERROR_TYPE.ERROR}
        heading="Unkown Product!"
        message={`A product with id: ${id} cannot be found.`}
      />
    );
  } else {
    const { title, price, category, description, image } = product;
    content = (
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

  return (
    <section>
      {content}
      {/* <AddToCartSummary /> */}
    </section>
  );
};

export default ProductSingle;
