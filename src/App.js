import { useEffect } from "react";
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
import { fetchCart } from "./redux/actions/cart-actions";
import Spinner from "./components/UI/Spinner/Spinner";
import Modal from "./components/UI/Modal/Modal";
import FloatingAlerts from "./components/UI/Alert/FloatingAlerts";

function App() {
  const { loading: isLoading, alerts } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart("1"));
  }, []);

  return (
    <>
      {isLoading && (
        <Modal>
          <Spinner />
        </Modal>
      )}
      {alerts.length > 0 && <FloatingAlerts alerts={alerts} />}

      <Router>
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
