import { useState, useEffect, useRef } from "react";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import NumberButtons from "../UI/Control/NumberButtons";
import Button from "../UI/Button/Button";
import { useParams } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";
import InfoError, { INFO_ERROR_TYPE } from "../Error/InfoError";
import toDollars from "../../utilities/toDollars";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  clearProduct,
} from "../../redux/actions/product-actions";
import { uiActions } from "../../redux/slices/ui-slice";
import { addToCart } from "../../redux/actions/cart-actions";
import styles from "./ProductSingle.module.css";

import Modal from "../UI/Modal/Modal";

const ProductSingle = () => {
  const { id } = useParams();
  const { isLoading, error, product } = useSelector(
    (state) => state.selectedProduct
  );
  const modal = useSelector((state) => state.ui.modal);
  const dispatch = useDispatch();
  const qtyRef = useRef();

  const [modalProps, setModalProps] = useState(null);

  useEffect(() => {
    dispatch(fetchProduct(id));
    return () => dispatch(clearProduct());
  }, []);

  const contShoppingHandler = () => {
    dispatch(uiActions.showModal(true));
    setModalProps({
      type: "alert",
      title: "Continue Shopping...",
      body: "Remember you can add more items to your cart!",
      okText: "Take me to the shops!",
      onConfirm: () => console.log("Shopping commenced..."),
    });
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    const qty = +qtyRef.current.value;
    dispatch(addToCart(product, qty))
      .then(() => {
        dispatch(uiActions.showModal(true));
        setModalProps({
          type: "confirm",
          title: "Item added to cart successfully!",
          body: "Do you want to view your cart?",
          cancelText: "Continue Shopping",
          okText: "View Cart",
          onConfirm: () => console.log("Viewing Cart..."),
          onCancel: contShoppingHandler,
        });
      })
      .catch((err) => console.log("Handle error: ", err));
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
              <Button variant="outlined">Add to Wishlist</Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {modal.display && modalProps && <Modal {...modalProps} />}
      {/* {modal.display && modalProps && (
        <Modal {...modalProps}>
          <div>Yes Hello</div>
        </Modal>
      )} */}

      <section>{content}</section>
    </>
  );
};

export default ProductSingle;
