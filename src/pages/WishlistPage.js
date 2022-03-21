import Wishlist from "../components/Wishlist/Wishlist";
import useSetDocumentTitle from "../hooks/use-setDocumentTitle";

const WishlistPage = () => {
  useSetDocumentTitle("Wishlist");
  return <Wishlist />;
};

export default WishlistPage;
