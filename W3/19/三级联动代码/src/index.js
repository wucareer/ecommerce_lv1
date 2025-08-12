import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import Order from './pages/Order';
import OrderSuccess from './pages/OrderSuccess';
import reportWebVitals from './reportWebVitals';
import RouteProxy from './components/RouteProxy';
import HomeLayout from './layout/HomeLayout';
import CommonLayout from './layout/CommonLayout';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <>
        {/* <Provider store={store}> */}
        <BrowserRouter>
            <Routes>
                <Route element={<RouteProxy />}>
                    <Route element={<HomeLayout />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route element={<CommonLayout />}>
                        <Route path="/search" element={<Search />} />
                        <Route path='/detail' element={<Detail />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/order/success" element={<OrderSuccess />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
        </>
        
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
