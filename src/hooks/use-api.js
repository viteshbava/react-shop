import React, { useState, useEffect, useMemo } from "react";
import useHttp from "./use-http";
import { URL } from "../config/config";

const useGetProduct = (id) => {
  const config = useMemo(() => {
    return { url: `${URL.PRODUCTS}/${id}` };
  }, [URL.PRODUCTS, id]);
  const { isLoading, error, results: product } = callAPI(config);
  return { isLoading, error, product };
};

const useGetProducts = () => {
  const config = useMemo(() => {
    return { url: URL.PRODUCTS };
  }, [URL.PRODUCTS]);
  const { isLoading, error, results: products } = callAPI(config);
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
