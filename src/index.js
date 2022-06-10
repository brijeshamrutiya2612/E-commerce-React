import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import homeReducer from './redux/reducers/homeReducer'
import { configureStore } from '@reduxjs/toolkit';
import  userReducer  from './redux/reducers/loginReducer';
import cartReducer from './redux/reducers/cartReducer';
import registerReducer from './redux/reducers/userReducer';


export const store = configureStore({
    reducer:{
      home: homeReducer,
      cart: cartReducer,
      users: userReducer,
      register: registerReducer
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
