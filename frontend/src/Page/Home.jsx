import React from 'react';
import { Link } from 'react-router-dom';
import Restaurant from '../Page/Restaurants';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to FoodDelivery
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Order your favorite food from the best restaurants in town
          </p>
          <Restaurant/>
        </div>
      </div>
    </div>
  );
};

export default Home;