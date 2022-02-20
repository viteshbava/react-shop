import { useState, useEffect, useRef, useContext } from "react";
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
import { addToCart } from "../../redux/actions/cart-actions";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist-actions";
import styles from "./ProductSingle.module.css";

import ModalContext from "../../context/modal-context";
import AddToCartSummary from "../AddToCartSummary/AddToCartSummary";

const ProductSingle = () => {
  const id = +useParams().id;
  const { isLoading, error, product } = useSelector(
    (state) => state.selectedProduct
  );
  const wishlist = useSelector((state) => state.wishlist.products);
  const { isLoading: cartLoading } = useSelector((state) => state.cart);
  const { isLoading: wishlistLoading, loadingProduct } = useSelector(
    (state) => state.wishlist
  );
  const dispatch = useDispatch();
  const qtyRef = useRef();
  const modal = useContext(ModalContext);

  const [initialRender, setInitialRender] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    setInitialRender(false);
    dispatch(fetchProduct(id));
    return () => dispatch(clearProduct());
  }, [id]);

  useEffect(() => {
    const foundProduct = wishlist.find((p) => p.id === id);
    setInWishlist(!!foundProduct);
  }, [id, wishlist]);

  const addToCartHandler = (e) => {
    e.preventDefault();
    const qty = +qtyRef.current.value;
    dispatch(
      addToCart({
        product,
        quantity: qty,
        onAddSuccess: () => addToCartSuccess(qty),
      })
    );
  };

  const addToCartSuccess = (qty) => {
    modal.showModal({
      type: "custom",
      customContent: <AddToCartSummary numItemsAdded={qty} />,
    });
  };

  const toggleWishlistHandler = () => {
    inWishlist
      ? dispatch(removeFromWishlist(id))
      : dispatch(addToWishlist(product));
  };

  const getProductContent = () => {
    if (initialRender) return <></>;

    if (isLoading) return <Spinner />;

    if (error)
      return (
        <InfoError
          type={INFO_ERROR_TYPE.ERROR}
          heading="Error Fetching Product!"
          message={error.message}
        />
      );

    if (!product)
      return (
        <InfoError
          type={INFO_ERROR_TYPE.ERROR}
          heading="No Data for that Product!"
          message={`Unable to retrieve data for product with ID: ${id}`}
        />
      );

    const { title, price, category, description, image } = product;

    const wishlistBtnIcon = inWishlist ? (
      <Icon icon={ICON_TYPE.HEART_FULL} />
    ) : (
      <Icon icon={ICON_TYPE.HEART_EMPTY} />
    );
    const wishlistBtnText = inWishlist
      ? "Added to Wishlist (click to remove)"
      : "Add to Wishlist";

    return (
      <>
        <SectionHeading>{title}</SectionHeading>
        <div className={styles["grid-wrapper"]}>
          <div className={styles["image-wrapper"]}>
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
              <Button
                loading={cartLoading}
                className={styles["add-to-cart-button"]}
                type={"submit"}
                icon={<Icon icon={ICON_TYPE.CART} />}
              >
                Add to Cart
              </Button>
            </form>
            <div className={styles["action-wrapper"]}>
              <Button
                loading={wishlistLoading || loadingProduct === id}
                onClick={toggleWishlistHandler}
                variant="outlined"
                icon={wishlistBtnIcon}
              >
                {wishlistBtnText}
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <section>{getProductContent()}</section>
    </>
  );
};

export default ProductSingle;
