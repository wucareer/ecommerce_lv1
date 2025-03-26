import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import Order from './pages/Order';
import OrderSuccess from './pages/OrderSuccess';
import reportWebVitals from './reportWebVitals';
import CRoute from './components/CRoute';
import RouteProxy from './components/RouteProxy';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <CRoute proxy={() => {
      if (true) {
        return ()=>{return <div>loading...</div>}
      }
    }}> */}
    {/* <CRoute path="/" element={<Home />} />
      <CRoute path="/search" element={<Search />} />
      <CRoute path='/detail' element={<Detail />} />
      <CRoute path='/cart' element={<Cart />} />
      <CRoute path="/order" element={<Order />} />
      <CRoute path="/order/success" element={<OrderSuccess />} />
    </CRoute> */}
    <BrowserRouter>
      <Routes>
        <Route element={<RouteProxy />}>

          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path='/detail' element={<Detail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/success" element={<OrderSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
