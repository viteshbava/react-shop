import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SectionHeading from '../UI/SectionHeading/SectionHeading';
import WishlistItem from './WishlistItem';
import InfoError, { INFO_ERROR_TYPE } from '../Error/InfoError';
import PageLoader from '../Feedback/PageLoader/PageLoader';
import styles from './Wishlist.module.css';
import Animate from '../UI/Animate/Animate';
import AnimateList from '../UI/Animate/AnimateList';

const Wishlist = () => {
  const { isLoading, hasLoaded, error, products, totalQuantity } = useSelector(
    (state) => state.wishlist
  );
  const [renderList, setRenderList] = useState(false);

  // Upon initial render / when products change, if there are products, render them.  If no more products, keep rendering products to finish last animation.  AnimateList component will set renderList back to False accordingly.
  useEffect(() => {
    if (products?.length) setRenderList(true);
  }, [products?.length]);

  const getWishlistContent = () => {
    if (isLoading || !hasLoaded)
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

    if (!renderList) {
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
        <ul className={styles['item-list']}>
          <AnimateList unmountList={() => setRenderList(false)}>
            {products.map((p) => (
              <Animate key={p.id} exitTime={200} animation="fade">
                <WishlistItem product={p} />
              </Animate>
            ))}
          </AnimateList>
        </ul>
      </>
    );
  };

  return <section>{getWishlistContent()}</section>;
};

export default Wishlist;
