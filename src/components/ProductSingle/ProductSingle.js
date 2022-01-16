import React from "react";
import SectionHeading from "../UI/SectionHeading/SectionHeading";
import AddToCartSummary from "../AddToCartSummary/AddToCartSummary";
import Icon, { ICON_TYPE } from "../UI/Icon/Icon";
import Control, { CONTROL_TYPE } from "../UI/Control/Control";
import Button, { BTN_TYPE } from "../UI/Button/Button";
import styles from "./ProductSingle.module.css";

const ProductSingle = () => {
  const url = "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg";
  return (
    <section>
      <SectionHeading>Compact Digital Camera</SectionHeading>
      <div className={styles["grid-wrapper"]}>
        <div className={styles["image-wrapper"]}>
          <Icon
            className={styles["wishlist-toggle"]}
            icon={ICON_TYPE.HEART_EMPTY}
          />
          <img className={styles.image} src={url} alt="Product Image" />
        </div>
        <div>
          <p className={styles.category}>Cameras & Phones</p>
          <p className={styles["product-id"]}>
            Product ID: <span>123456</span>
          </p>
          <p className={styles.price}>$109.95</p>
          <p className={styles.descr}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae orci
            rutrum eget ipsum cursus interdum volutpat a, neque. Purus rhoncus
            ipsum, mauris, proin nibh. Fringilla interdum amet amet feugiat
            diam. Erat vulputate dignissim quam sollicitudin suscipit adipiscing
            libero aliquet mauris. Sed pellentesque auctor convallis et pharetra
            fusce ornare ultrices pellentesque. Quis diam sed tortor ac netus
            tincidunt. Enim, ultricies tellus id mi egestas. Amet posuere neque,
            lorem sapien. Et facilisi orci ac ipsum magnis.{" "}
          </p>
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
      <AddToCartSummary />
    </section>
  );
};

export default ProductSingle;
