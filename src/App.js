import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignIn from "./components/Auth/SignIn";
import ProductList from "./components/ProductList/ProductList";
import ProductSingle from "./components/ProductSingle/ProductSingle";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";

function App() {
  return (
    <>
      <Header />

      <main>
        <div className="container">
          <SignIn />
          {/* <ProductList /> */}
          {/* <ProductSingle /> */}
          {/* <Cart /> */}
          {/* <Wishlist /> */}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
