import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import { ModalContextProvider } from './context/modal-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </Provider>
  </React.StrictMode>
);
