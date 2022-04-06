import { useState, useEffect, cloneElement } from 'react';
import { useSelector } from 'react-redux';
import SectionHeading from '../UI/SectionHeading/SectionHeading';
import WishlistItem from './WishlistItem';
import InfoError, { INFO_ERROR_TYPE } from '../Error/InfoError';
import PageLoader from '../Feedback/PageLoader/PageLoader';
import styles from './Wishlist.module.css';
import Animate from '../UI/Animate/Animate';

// Add new children
// Purge currentChildren so it doesn't keep getting bigger... ?

const AnimateList = ({ children }) => {
  const [currentChildren, setCurrentChildren] = useState([]);

  const currKeySet = new Set(currentChildren.map((child) => child.key));
  const newChildren = children.filter((child) => !currKeySet.has(child.key));

  useEffect(() => {
    if (newChildren.length > 0)
      setCurrentChildren((prev) => [...prev, ...newChildren]);
  }, [newChildren]);

  console.log('AnimateList - curentChildren: ', currentChildren);

  // get keySet for children (for more efficiency during lookup)
  const newKeySet = new Set(children.map((child) => child.key));

  // returnChildren: For each element in currentChildren, check if its key lives in children: if yes, show=true, if no, show=false
  const returnChildren = currentChildren.map((child) =>
    cloneElement(child, { isMounted: newKeySet.has(child.key) })
  );

  console.log('AnimateList - returnChildren: ', returnChildren);

  return returnChildren;
};

const Wishlist = () => {
  const { isLoading, hasLoaded, error, products, totalQuantity } = useSelector(
    (state) => state.wishlist
  );

  console.log('products from redux: ', products);

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
        <ul className={styles['item-list']}>
          <AnimateList>
            {products.map((p) => (
              <Animate
                key={p.id}
                enterTime={500}
                exitTime={500}
                animation="fade"
              >
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
