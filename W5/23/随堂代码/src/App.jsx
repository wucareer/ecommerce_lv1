import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './layouts/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Promotions from './pages/Promotions';
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Dashboard />}>
        <Route path="/" element={<Products />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App; 