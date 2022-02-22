import { useEffect } from "react";
import "./App.css";

import Layout from "./components/Layout/Layout";

import { useDispatch } from "react-redux";
import { fetchUserCart } from "./redux/actions/cart-actions";
import { fetchWishlist } from "./redux/actions/wishlist-actions";
import { fetchProducts } from "./redux/actions/product-actions";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "./utilities/ScrollToTop";

import SignIn from "./pages/Signin/SignIn";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList/ProductList";
import ProductSingle from "./pages/ProductSingle/ProductSingle";
import Help from "./pages/Help/Help";
import About from "./pages/About/About";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import InfoError, { INFO_ERROR_TYPE } from "./pages/Error/InfoError";

import AboutText_1 from "./pages/About/AboutText_1";
import AboutText_2 from "./pages/About/AboutText_2";

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
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductSingle />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/help/*" element={<Help />} />
          <Route exact path="/about" element={<About />}>
            <Route path="about1" element={<AboutText_1 />} />
            <Route path="about2" element={<AboutText_2 />} />
            <Route index element={<></>} />
            <Route path="*" element={<div>About text not found!</div>} />
          </Route>
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
      </Layout>
    </Router>
  );
}

export default App;
