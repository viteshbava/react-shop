import React, { Suspense, useEffect, useMemo } from "react";
import "./App.css";

import Layout from "./components/Layout/Layout";
import PageLoader from "./components/Feedback/PageLoader/PageLoader";

import { useDispatch } from "react-redux";
import { fetchUserCart } from "./redux/actions/cart-actions";
import { fetchWishlist } from "./redux/actions/wishlist-actions";
import { fetchProducts } from "./redux/actions/product-actions";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "./utilities/ScrollToTop";

import ProductList from "./pages/ProductList/ProductList";
import InfoError, { INFO_ERROR_TYPE } from "./pages/Error/InfoError";
const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const SignIn = React.lazy(() => import("./pages/Signin/SignIn"));
const Register = React.lazy(() => import("./pages/Register"));
const ProductSingle = React.lazy(() =>
  import("./pages/ProductSingle/ProductSingle")
);
const Help = React.lazy(() => import("./pages/Help/Help"));
const About = React.lazy(() => import("./pages/About/About"));
const Wishlist = React.lazy(() => import("./pages/Wishlist/Wishlist"));
const AboutTextOne = React.lazy(() => import("./pages/About/AboutTextOne"));
const AboutTextTwo = React.lazy(() => import("./pages/About/AboutTextTwo"));

function App() {
  const dispatch = useDispatch();

  const DUMMY_USERID = 1;

  useEffect(() => {
    dispatch(fetchUserCart(DUMMY_USERID));
    dispatch(fetchWishlist(DUMMY_USERID));
    dispatch(fetchProducts());
  }, [DUMMY_USERID, dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductSingle />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/help/*" element={<Help />} />
            <Route exact path="/about" element={<About />}>
              <Route path="about1" element={<AboutTextOne />} />
              <Route path="about2" element={<AboutTextTwo />} />
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
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
