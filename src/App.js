import { useEffect, useContext } from "react";
import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FloatingAlerts from "./components/UI/Alert/FloatingAlerts";
import FullScreenLoader from "./components/UI/FullScreenLoader/FullScreenLoader";
import InfoError, { INFO_ERROR_TYPE } from "./components/Error/InfoError";
import Modal from "./components/UI/Modal/Modal";

import ModalContext from "./context/modal-context";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart } from "./redux/actions/cart-actions";
import { fetchWishlist } from "./redux/actions/wishlist-actions";
import { fetchProducts } from "./redux/actions/product-actions";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "./pages/Signin/SignIn";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList/ProductList";
import ProductSingle from "./pages/ProductSingle/ProductSingle";
import Help from "./pages/Help";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";

import ScrollToTop from "./utilities/ScrollToTop";

function App() {
  const isLoading = useSelector((state) => state.ui.loading);
  const { alerts } = useSelector((state) => state.ui.alerts);
  const dispatch = useDispatch();

  const modal = useContext(ModalContext);

  const DUMMY_USERID = 1;

  useEffect(() => {
    dispatch(fetchUserCart(DUMMY_USERID));
    dispatch(fetchWishlist(DUMMY_USERID));
    dispatch(fetchProducts());
  }, [DUMMY_USERID]);

  return (
    <>
      <Router>
        {modal.show && modal.props && <Modal {...modal.props} />}
        {isLoading && <FullScreenLoader />}
        {alerts.length > 0 && <FloatingAlerts alerts={alerts} />}
        <ScrollToTop />
        <Header />
        <main>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<ProductList />} />
              <Route exact path="/signin" element={<SignIn />} />
              <Route exact path="/register" element={<Register />} />
              <Route path="/product/:id" element={<ProductSingle />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/wishlist" element={<Wishlist />} />
              <Route exact path="/help" element={<Help />} />
              <Route exact path="/about" element={<About />} />
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
