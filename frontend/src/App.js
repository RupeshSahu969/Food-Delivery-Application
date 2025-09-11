import React from 'react';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Page/Home';
import Login from './Page/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import Register from './Page/Register';
import Restaurant from './Page/Restaurants';
import RestaurantDetail from './Page/RestaurantDetail';
import Cart from './Page/Cart';
import Orders from './Page/Orders';


function App() {
  return (
    
      <>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/restaurants" element={<Restaurant />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </>
    
  );
}

export default App;