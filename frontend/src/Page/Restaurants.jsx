// Page/Restaurants.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../Redux/Store/restaurantSlice';

const Restaurants = () => {
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector(state => state.restaurants);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-green-600">Our Restaurants</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                <p className="text-gray-600 text-sm">{restaurant.cuisineType}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-yellow-500">★ {restaurant.rating}</span>
                  <span className="text-gray-500">{restaurant.deliveryTime}</span>
                </div>
                <Link
                  to={`/restaurants/${restaurant._id}`}
                  className="mt-4 block bg-green-500 text-white text-center py-2 rounded hover:bg-green-600 transition"
                >
                  View Menu
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
