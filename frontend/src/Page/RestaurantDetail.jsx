// Page/RestaurantDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantById } from '../Redux/Store/restaurantSlice';
import { addItem } from '../Redux/Store/cartSlice';
import { AiFillStar, AiOutlinePlus } from 'react-icons/ai';

const RestaurantDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentRestaurant, loading, error } = useSelector(state => state.restaurants);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(fetchRestaurantById(id));
  }, [dispatch, id]);

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  if (loading) 
    return <div className="flex items-center justify-center min-h-screen text-gray-600 text-xl">Loading...</div>;

  if (error || !currentRestaurant) 
    return <div className="flex items-center justify-center min-h-screen text-red-500 text-xl">Error loading restaurant</div>;

  const { restaurant, menu } = currentRestaurant;
  const categories = [...new Set(menu?.map(item => item.category).filter(Boolean) || [])];

  return (
    <div className="min-h-screen bg-gray-100 py-8 mt-20">
      <div className="container mx-auto px-4">

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-full font-medium ${selectedCategory === '' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-green-400 hover:text-white transition'}`}
              onClick={() => setSelectedCategory('')}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full font-medium ${selectedCategory === category ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-green-400 hover:text-white transition'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menu
            ?.filter(item => selectedCategory === '' || item.category === selectedCategory)
            .map(item => (
              <div key={item._id} className="bg-white rounded-lg shadow-md p-4 flex gap-4 hover:shadow-lg transition transform hover:-translate-y-1">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-green-600 font-bold">₹{item.price}</p>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      Add <AiOutlinePlus />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
