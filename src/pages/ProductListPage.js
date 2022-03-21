import ProductList from "../components/ProductList/ProductList";
import useSetDocumentTitle from "../hooks/use-setDocumentTitle";

const ProductListPage = () => {
  useSetDocumentTitle("React Shop - Products");
  return <ProductList />;
};

export default ProductListPage;
