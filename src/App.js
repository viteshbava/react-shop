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

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <main>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<ProductList />} />
              <Route exact path="/signin" element={<SignIn />} />
              <Route path="/product" element={<ProductSingle />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/wishlist" element={<Wishlist />} />
              <Route>404 Not Found!</Route>
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
