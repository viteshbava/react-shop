import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/preTypedHooks';
import SectionHeading from '../UI/SectionHeading/SectionHeading';
import CartItem from './CartItem';
import CartOrderSummary from './CartOrderSummary';
import PageLoader from '../Feedback/PageLoader/PageLoader';
import InfoError, { INFO_ERROR_TYPE } from '../Error/InfoError';
import styles from './Cart.module.css';
import Animate from '../UI/Animate/Animate';
import AnimateList from '../UI/Animate/AnimateList';

const Cart = () => {
  const { isLoading, hasLoaded, error, data, totalQuantity } = useAppSelector(
    (state) => state.cart
  );
  const [renderList, setRenderList] = useState(false);

  // Upon initial render / when products change, if there are products, render them.  If no more products, keep rendering products to finish last animation.  AnimateList component will set renderList back to False accordingly.
  useEffect(() => {
    if (data?.products?.length) setRenderList(true);
  }, [data?.products?.length]);

  const getCartContent = () => {
    if (isLoading || !hasLoaded)
      return (
        <>
          <SectionHeading>Cart</SectionHeading>
          <PageLoader />
        </>
      );

    if (error)
      return (
        <InfoError
          type={INFO_ERROR_TYPE.ERROR}
          heading="Error Fetching Cart!"
          message={error.message}
        />
      );

    if (!renderList)
      return (
        <InfoError
          type={INFO_ERROR_TYPE.INFO}
          heading="Your Cart is Empty!"
          message="Go add some products!"
        />
      );

    return (
      <>
        <SectionHeading>Cart ({totalQuantity})</SectionHeading>
        <div className={styles['grid-wrapper']}>
          <ul className={styles['item-list']}>
            <AnimateList unmountList={() => setRenderList(false)}>
              {data?.products.map((p) => (
                <Animate key={p.data.id} exitTime={200} animation="fade">
                  <CartItem product={p} />
                </Animate>
              ))}
            </AnimateList>
          </ul>
          <CartOrderSummary />
        </div>
      </>
    );
  };

  return <section>{getCartContent()}</section>;
};

export default Cart;
