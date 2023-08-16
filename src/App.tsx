import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/Store';
import TopMenu from './components/topMenu/TopMenu';
import NavigationMenu from './components/navMenu/NavigationMenu';
const Orders = React.lazy(() => import('./components/orders'));
const Products = React.lazy(() => import('./components/products'));

const App: React.FC = () => (
  <Provider store={store}>
  <Router>
    <div>
      <TopMenu />
      <NavigationMenu />
      <Suspense fallback={<div>Завантаження...</div>}>
        <Routes>
          <Route index path="/" element={<Orders />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Suspense>
    </div>
  </Router>
</Provider>
);

export default App;
