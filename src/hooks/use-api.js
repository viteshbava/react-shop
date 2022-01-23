import React, { useState, useEffect } from "react";
import useHttp from "./use-http";
import { URL } from "../config/config";

const useGetProduct = (id) => {
  const {
    isLoading,
    error,
    results: product,
  } = callAPI({ url: `${URL.PRODUCTS}/${id}` });
  return { isLoading, error, product };
};

const useGetProducts = () => {
  const {
    isLoading,
    error,
    results: products,
  } = callAPI({ url: URL.PRODUCTS });
  return { isLoading, error, products };
};

const callAPI = (config) => {
  const [results, setResults] = useState(null);
  const { isLoading, error, sendRequest } = useHttp();
  useEffect(() => {
    console.log("Calling API...");
    sendRequest(config, (res) => setResults(res));
  }, [sendRequest, config]);
  return { isLoading, error, results };
};

export { useGetProduct, useGetProducts };
