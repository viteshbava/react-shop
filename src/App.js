import { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignIn from "./components/Auth/SignIn";
import ProductList from "./components/ProductList/ProductList";
import ProductSingle from "./components/ProductSingle/ProductSingle";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import ScrollToTop from "./utilities/ScrollToTop";
import InfoError, { INFO_ERROR_TYPE } from "./components/Error/InfoError";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart, fetchCart } from "./redux/actions/cart-actions";
import { fetchWishlist } from "./redux/actions/wishlist-actions";
import Spinner from "./components/UI/Spinner/Spinner";
import ModalOverlay from "./components/UI/Modal/ModalOverlay";
import FloatingAlerts from "./components/UI/Alert/FloatingAlerts";

import Modal from "./components/UI/Modal/Modal";
import ModalContext from "./context/modal-context";

function App() {
  const isLoading = useSelector((state) => state.ui.loading);
  const { alerts } = useSelector((state) => state.ui.alerts);
  const dispatch = useDispatch();

  const modal = useContext(ModalContext);

  const DUMMY_USERID = 6;

  useEffect(() => {
    dispatch(fetchUserCart(DUMMY_USERID));
    dispatch(fetchWishlist(DUMMY_USERID));
  }, [DUMMY_USERID]);

  return (
    <>
      <Router>
        {modal.show && modal.props && <Modal {...modal.props} />}
        {isLoading && (
          <ModalOverlay>
            <Spinner />
          </ModalOverlay>
        )}
        {alerts.length > 0 && <FloatingAlerts alerts={alerts} />}
        <ScrollToTop />
        <Header />
        <main>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<ProductList />} />
              <Route exact path="/signin" element={<SignIn />} />
              <Route path="/product/:id" element={<ProductSingle />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/wishlist" element={<Wishlist />} />
              <Route
                path="*"
                element={
                  <InfoError
                    type={INFO_ERROR_TYPE.ERROR}
                    heading="Page Not Found!"
                    message="Please check the URL."
                  />
                }
              />
              <Route path="*">404 Not Found!</Route>
            </Routes>
          </div>
        </main>

        <Footer />
      </Router>
    </>
  );
}

export default App;
