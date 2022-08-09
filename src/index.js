import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import store from './redux';
import { Provider } from 'react-redux';
import App from './App';
import { handleResponseWithLoginCheck } from './services/baseService';

handleResponseWithLoginCheck();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <App />
    </Provider>
  </BrowserRouter>
  </React.StrictMode>
);

