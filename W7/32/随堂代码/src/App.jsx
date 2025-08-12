import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './layouts/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Activities from './pages/Activities';
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';
import Keywords from './pages/Keywords'
import NoAccess from './pages/NoAccess';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Dashboard />}>
        <Route path="/" element={<Products />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="activities" element={<Activities />} />
        <Route path="users" element={<Users />} />
        <Route path='keywords' element={<Keywords />} />
        <Route path='noAccess' element={<NoAccess />} />
        
      </Route>
    </Routes>
  );
}

export default App; 