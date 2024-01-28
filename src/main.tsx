import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/css/quill.css';
import App from '@pages/App';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
