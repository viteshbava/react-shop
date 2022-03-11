import React, { Suspense, useEffect } from "react";
import "./App.css";

import Feedback from "./components/Feedback/Feedback";
import Layout from "./components/Layout/Layout";
import PageLoader from "./components/Feedback/PageLoader/PageLoader";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart } from "./redux/actions/cart-actions";
import { fetchWishlist } from "./redux/actions/wishlist-actions";
import {
  fetchProducts,
  clearAllProducts,
} from "./redux/slices/allProducts-slice";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ScrollToTop from "./utilities/ScrollToTop";

import ProductList from "./pages/ProductList/ProductList";
import InfoError, { INFO_ERROR_TYPE } from "./pages/Error/InfoError";

import AuthRequired from "./components/AuthRequired";

const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const SignIn = React.lazy(() => import("./pages/Signin/SignIn"));
const Register = React.lazy(() => import("./pages/Register/Register"));
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
  const isLoggedIn = useSelector((state) => state.auth.user);

  const DUMMY_USERID = 1;

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserCart(DUMMY_USERID));
      dispatch(fetchWishlist(DUMMY_USERID));
      dispatch(fetchProducts());
    }
  }, [isLoggedIn, DUMMY_USERID, dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Feedback />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/products"
              element={
                <AuthRequired>
                  <ProductList />
                </AuthRequired>
              }
            />
            <Route
              path="/products/:id"
              element={
                <AuthRequired>
                  <ProductSingle />
                </AuthRequired>
              }
            />
            <Route
              path="/cart"
              element={
                <AuthRequired>
                  <Cart />
                </AuthRequired>
              }
            />
            <Route
              path="/wishlist"
              element={
                <AuthRequired>
                  <Wishlist />
                </AuthRequired>
              }
            />
            <Route path="/help/*" element={<Help />} />
            <Route exact path="/about" element={<About />}>
              <Route path="about1" element={<AboutTextOne />} />
              <Route path="about2" element={<AboutTextTwo />} />
              <Route index element={<></>} />
              <Route path="*" element={<div>About text not found!</div>} />
            </Route>
            <Route
              index
              element={<Navigate to={isLoggedIn ? "/products" : "signin"} />}
            />
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
