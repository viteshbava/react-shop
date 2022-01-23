import React, { useState, useEffect } from "react";
import useHttp from "./use-http";
import { URL } from "../config/config";

const useGetProduct = (id) => {
  const [product, setProduct] = useState(null);
  const { isLoading, error, sendRequest: getProduct } = useHttp();
  useEffect(() => {
    console.log("Fetching product from API...");
    getProduct({ url: `${URL.PRODUCTS}/${id}` }, (returnedProduct) =>
      setProduct(returnedProduct)
    );
  }, [getProduct, id]);

  return { isLoading, error, product };
};

const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const { isLoading, error, sendRequest: getProducts } = useHttp();
  useEffect(() => {
    console.log("Fetching products from API...");
    getProducts({ url: URL.PRODUCTS }, (returnedProducts) =>
      setProducts(returnedProducts)
    );
  }, [getProducts]);
  return { isLoading, error, products };
};

export { useGetProduct, useGetProducts };
