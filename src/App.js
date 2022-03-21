import React, { Suspense, useEffect } from "react";
import "./App.css";

import Feedback from "./components/Feedback/Feedback";
import Layout from "./components/Layout/Layout";
import PageLoader from "./components/Feedback/PageLoader/PageLoader";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart } from "./redux/actions/cart-actions";
import { fetchWishlist } from "./redux/actions/wishlist-actions";
import { fetchProducts } from "./redux/slices/allProducts-slice";
import { startRefreshTokenCycle } from "./redux/actions/auth-actions";
import { uiActions } from "./redux/slices/ui-slice";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ScrollToTop from "./utilities/ScrollToTop";

import InfoError, { INFO_ERROR_TYPE } from "./components/Error/InfoError";

import AuthRequired from "./components/AuthRequired";
import useAbortFetch from "./hooks/use-abortFetch";

const ProductListPage = React.lazy(() => import("./pages/ProductListPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const ProductSinglePage = React.lazy(() => import("./pages/ProductSinglePage"));
const HelpPage = React.lazy(() => import("./pages/HelpPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const WishlistPage = React.lazy(() => import("./pages/WishlistPage"));
const SettingsPage = React.lazy(() => import("./pages/SettingsPage"));
const AboutTextOne = React.lazy(() =>
  import("./components/About/AboutTextOne")
);
const AboutTextTwo = React.lazy(() =>
  import("./components/About/AboutTextTwo")
);

function App() {
  const dispatch = useDispatch();
  const { user, accessTokenReady, accessTokenTimer } = useSelector(
    (state) => state.auth
  );
  const isLoggedIn = !!user;

  const {
    abortSignal,
    abortFetchCalls,
    runFetchCalls,
    cancelFetchCalls,
    setFetchInProgress,
  } = useAbortFetch(isLoggedIn && accessTokenReady);

  const DUMMY_USERID = 1;

  useEffect(() => {
    if (runFetchCalls) {
      setFetchInProgress(true);
      dispatch(fetchUserCart(DUMMY_USERID, abortSignal));
      dispatch(fetchWishlist(DUMMY_USERID, abortSignal));
      dispatch(fetchProducts(abortSignal));
    }
    if (cancelFetchCalls) {
      setFetchInProgress(false);
      abortFetchCalls();
    }
  }, [
    runFetchCalls,
    cancelFetchCalls,
    dispatch,
    DUMMY_USERID,
    abortFetchCalls,
    abortSignal,
    setFetchInProgress,
  ]);

  const appStartAlreadyLoggedIn = isLoggedIn && !accessTokenReady;
  const startAccessTokenTimer =
    isLoggedIn && accessTokenReady && !accessTokenTimer;
  const displayContent = !isLoggedIn || (isLoggedIn && accessTokenReady);

  useEffect(() => {
    if (appStartAlreadyLoggedIn) {
      dispatch(uiActions.showLoadingState(true));
      dispatch(
        startRefreshTokenCycle({
          immediately: true,
        })
      );
    }
    if (startAccessTokenTimer)
      dispatch(
        startRefreshTokenCycle({
          immediately: false,
        })
      );
    if (displayContent) dispatch(uiActions.showLoadingState(false));
  }, [
    appStartAlreadyLoggedIn,
    startAccessTokenTimer,
    displayContent,
    dispatch,
  ]);

  return (
    <Router>
      <ScrollToTop />
      <Feedback />
      <Layout>
        {displayContent && (
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/products"
                element={
                  <AuthRequired>
                    <ProductListPage />
                  </AuthRequired>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <AuthRequired>
                    <ProductSinglePage />
                  </AuthRequired>
                }
              />
              <Route
                path="/cart"
                element={
                  <AuthRequired>
                    <CartPage />
                  </AuthRequired>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <AuthRequired>
                    <WishlistPage />
                  </AuthRequired>
                }
              />
              <Route
                path="/settings"
                element={
                  <AuthRequired>
                    <SettingsPage />
                  </AuthRequired>
                }
              />
              <Route path="/help/*" element={<HelpPage />} />
              <Route exact path="/about" element={<AboutPage />}>
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
        )}
      </Layout>
    </Router>
  );
}

export default App;
