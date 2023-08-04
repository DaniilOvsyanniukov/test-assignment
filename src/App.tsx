import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopMenu from './components/topMenu/TopMenu';
import NavigationMenu from './components/navMenu/NavigationMenu';
import Orders from './components/orders';
import Products from './components/products';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <TopMenu />
        <NavigationMenu />
        <Routes>
          <Route index path="/" element={<Orders />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;