import React, { useState } from "react";

const useInput = (isInputValid) => {
  const [input, setInput] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  const inputValid = isInputValid(input);
  const inputShowError = inputTouched && !inputValid;

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const inputBlurHandler = () => {
    setInputTouched(true);
  };

  const resetInput = () => {
    setInputTouched(false);
    setInput("");
  };

  return {
    input,
    inputValid,
    inputShowError,
    setInputTouched,
    inputChangeHandler,
    inputBlurHandler,
    resetInput,
  };
};

export default useInput;
