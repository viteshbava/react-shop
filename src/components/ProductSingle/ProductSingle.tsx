import { useState, useEffect, useRef, useContext, EventHandler } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../../redux/preTypedHooks';
import SectionHeading from '../UI/SectionHeading/SectionHeading';
import Icon, { ICON_TYPE } from '../UI/Icon/Icon';
import NumberButtons from '../UI/Control/NumberButtons';
import Button from '../UI/Button/Button';
import PageLoader from '../Feedback/PageLoader/PageLoader';
import InfoError, { INFO_ERROR_TYPE } from '../Error/InfoError';
import toDollars from '../../utilities/toDollars';
import {
  fetchProduct,
  clearProduct,
} from '../../redux/slices/selectedProduct-slice';
import { addToCart } from '../../redux/actions/cart-actions';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../redux/actions/wishlist-actions';
import styles from './ProductSingle.module.css';

import ModalContext from '../../context/modal-context';
import AddToCartSummary from './AddToCartSummary';
import useSetDocumentTitle from '../../hooks/use-setDocumentTitle';
import Product from '../../models/product';

const ProductSingle = () => {
  // get ID of product from URL
  const idStr: string = useParams()?.id ?? '';
  const id: number = +idStr;

  const { isLoading, hasLoaded, error, product } = useAppSelector(
    (state) => state.selectedProduct
  );
  const wishlist = useAppSelector((state) => state.wishlist.products);
  const { isLoading: cartLoading } = useAppSelector((state) => state.cart);
  const { isLoading: wishlistLoading } = useAppSelector(
    (state) => state.wishlist
  );
  const dispatch = useAppDispatch();
  const qtyRef = useRef<HTMLInputElement>();
  const modal = useContext(ModalContext);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const { abort: abortFetchProduct } = dispatch(fetchProduct(id));
    return () => {
      abortFetchProduct();
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    const foundProduct = wishlist.find((p: Product) => p.id === id);
    setInWishlist(!!foundProduct);
  }, [id, wishlist]);

  useSetDocumentTitle('Product Details', product?.title);

  const addToCartSuccess = (qty: number) => {
    // modal.showModal({
    //   type: 'custom',
    //   customContent: <AddToCartSummary numItemsAdded={qty} />,
    // });
  };

  const addToCartHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qtyRef.current) return;
    const qty = +qtyRef.current.value;
    if (!product) return;
    dispatch(
      addToCart({
        product,
        quantity: qty,
        onAddSuccess: () => addToCartSuccess(qty),
      })
    );
  };

  const toggleWishlistHandler = () => {
    if (inWishlist) dispatch(removeFromWishlist(id));
    else dispatch(addToWishlist(product));
  };

  const getProductContent = () => {
    if (isLoading || !hasLoaded) {
      console.log('Rendering page loader...');
      return <PageLoader />;
    }
    if (error) {
      console.log('Rendering error...');
      console.log(error);
      return (
        <InfoError
          type={INFO_ERROR_TYPE.ERROR}
          heading="Error Fetching Product!"
          message={error.message}
        />
      );
    }

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
      ? 'Added to Wishlist (click to remove)'
      : 'Add to Wishlist';

    return (
      <>
        <SectionHeading>{title}</SectionHeading>
        <div className={styles['grid-wrapper']}>
          <div className={styles['image-wrapper']}>
            <img className={styles.image} src={image} alt="product" />
          </div>
          <div className={styles['details-wrapper']}>
            <p className={styles.category}>{category}</p>
            <p className={styles['product-id']}>{`Product ID: ${id}`}</p>
            <p className={styles.price}>{toDollars(price)}</p>
            <p className={styles.descr}>{description}</p>
            <form
              className={styles['add-to-cart-form']}
              onSubmit={addToCartHandler}
            >
              <NumberButtons
                className={styles.quantity}
                focusRef={qtyRef}
                label="Quantity"
                id="quantity"
                min={1}
                value={1}
              />
              <Button
                loading={cartLoading}
                className={styles['add-to-cart-button']}
                type="submit"
                icon={<Icon icon={ICON_TYPE.CART} />}
              >
                Add to Cart
              </Button>
            </form>
            <div className={styles['action-wrapper']}>
              <Button
                loading={wishlistLoading}
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

  console.log('Rendering...');
  return <section>{getProductContent()}</section>;
};

export default ProductSingle;
