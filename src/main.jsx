import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import Approuter from './Approuter.jsx';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; 
import cartReducer, { gettotal } from './redux/cartSlice.js';
import Nabar from './component/nbar.jsx';
import Footer from './component/footer.jsx';

const store = configureStore({
  reducer: {
    cart:cartReducer
  }
});
store.dispatch(gettotal());
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <ToastContainer></ToastContainer>
      <Provider store={store}>
        <Nabar></Nabar>
        <Approuter />
        <Footer></Footer>
      </Provider>
    </BrowserRouter>
);
