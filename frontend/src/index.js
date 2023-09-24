import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/index.css';

const root = document.getElementById('root');
if (!root) throw new Error("No root element found");
const appRoot = ReactDOM.createRoot(root);

appRoot.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>
);
