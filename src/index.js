import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { AuthContextProvider } from "./context/auth-context";
import { ModalContextProvider } from "./context/modal-context";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ModalContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
