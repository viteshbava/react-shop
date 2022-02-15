import { useState, useEffect } from "react";
import Card from "../UI/Card/Card";
import styles from "./ProductListItem.module.css";
import toDollars from "../../utilities/toDollars";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromWishlist,
  addToWishlist,
} from "../../redux/actions/wishlist-actions";
import { Link } from "react-router-dom";

const ProductListItem = ({ product }) => {
  const wishlist = useSelector((state) => state.wishlist.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const foundProduct = wishlist.find((p) => p.id === product.id);
    setInWishlist(!!foundProduct);
  }, [product, wishlist]);

  const productClickHandler = () => {
    navigate(`/product/${product.id}`);
  };

  const toggleWishlistHandler = (e) => {
    e.preventDefault();
    inWishlist
      ? dispatch(removeFromWishlist(product.id))
      : dispatch(addToWishlist(product));
  };

  const wishListIcon = inWishlist
    ? ICON_TYPE.HEART_FULL
    : ICON_TYPE.HEART_EMPTY;

  return (
    <li className={styles["grid-flex"]}>
      <Link to={`/product/${product.id}`}>
        <Card className={styles.wrapper}>
          <div className={styles["image-wrapper"]}>
            <button
              className={styles["wishlist-toggle"]}
              onClick={toggleWishlistHandler}
            >
              <Icon icon={wishListIcon} />
            </button>
            <img
              className={styles.image}
              src={product.image}
              alt="Product Image"
            />
          </div>
          <h2 className={styles.heading}>{product.title}</h2>
          <h1 className={styles.price}>{toDollars(product.price)}</h1>
        </Card>
      </Link>
    </li>
  );
};

export default ProductListItem;
