import { useEffect, useRef } from "react";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import NumberButtons from "../UI/Control/NumberButtons";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import { useParams } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";
import InfoError, { INFO_ERROR_TYPE } from "../Error/InfoError";
import toDollars from "../../utilities/toDollars";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  clearProduct,
} from "../../redux/actions/product-actions";
import { addToCart } from "../../redux/actions/cart-actions";
import AddToCartSummary from "../AddToCartSummary/AddToCartSummary";
import styles from "./ProductSingle.module.css";

const ProductSingle = () => {
  const { id } = useParams();
  const { isLoading, error, product } = useSelector(
    (state) => state.selectedProduct
  );
  const addToCartSummary = useSelector((state) => state.ui.addToCartSummary);
  const dispatch = useDispatch();
  const qtyRef = useRef();

  useEffect(() => {
    dispatch(fetchProduct(id));
    return () => dispatch(clearProduct());
  }, []);

  const addToCartHandler = (e) => {
    e.preventDefault();
    const qty = +qtyRef.current.value;
    dispatch(addToCart(product, qty));
  };

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
            <form
              className={styles["add-to-cart-form"]}
              onSubmit={addToCartHandler}
            >
              <NumberButtons
                className={styles.quantity}
                focusRef={qtyRef}
                label="Quantity"
                id="quantity"
                min="1"
                value={1}
              />
              <Button className={styles["add-to-cart-button"]} type={"submit"}>
                <Icon icon={ICON_TYPE.CART} />
                Add to Cart
              </Button>
            </form>
            <div className={styles["action-wrapper"]}>
              <Button style={BTN_TYPE.SECONDARY}>Add to Wishlist</Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <section>
      {content}
      {addToCartSummary && <AddToCartSummary {...addToCartSummary} />}
    </section>
  );
};

export default ProductSingle;
