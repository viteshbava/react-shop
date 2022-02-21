import { useEffect } from "react";
import "./App.css";

import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import Feedback from "./components/Feedback/Feedback";

import { useDispatch } from "react-redux";
import { fetchUserCart } from "./redux/actions/cart-actions";
import { fetchWishlist } from "./redux/actions/wishlist-actions";
import { fetchProducts } from "./redux/actions/product-actions";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "./pages/Signin/SignIn";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList/ProductList";
import ProductSingle from "./pages/ProductSingle/ProductSingle";
import Help from "./pages/Help/Help";
import HelpText_1 from "./pages/Help/HelpText_1";
import HelpText_2 from "./pages/Help/HelpText_2";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import InfoError, { INFO_ERROR_TYPE } from "./pages/Error/InfoError";

import ScrollToTop from "./utilities/ScrollToTop";

function App() {
  const dispatch = useDispatch();

  const DUMMY_USERID = 1;

  useEffect(() => {
    dispatch(fetchUserCart(DUMMY_USERID));
    dispatch(fetchWishlist(DUMMY_USERID));
    dispatch(fetchProducts());
  }, [DUMMY_USERID]);

  return (
    <Router>
      <Feedback />
      <ScrollToTop />
      <Header />
      <main>
        <div className="container">
          <Routes>
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductSingle />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/wishlist" element={<Wishlist />} />
            <Route exact path="/help" element={<Help />}>
              <Route path="help1" element={<HelpText_1 />} />
              <Route path="help2" element={<HelpText_2 />} />
              <Route
                path="*"
                element={
                  <InfoError
                    type={INFO_ERROR_TYPE.ERROR}
                    heading="Help Text Not Found!"
                    message="Please check the URL."
                  />
                }
              />
            </Route>
            <Route exact path="/about" element={<About />} />
            <Route index element={<ProductList />} />
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
          </Routes>
        </div>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
