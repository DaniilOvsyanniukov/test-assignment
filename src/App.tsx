import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/Store';
import TopMenu from './components/topMenu/TopMenu';
import NavigationMenu from './components/navMenu/NavigationMenu';
import Orders from './components/orders';
import Products from './components/products';

import './App.css';

const App: React.FC = () => (
  <Provider store={store}>
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
  </Provider>
);

export default App;
