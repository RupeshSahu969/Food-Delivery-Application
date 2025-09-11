// Cart.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../Redux/Store/cartSlice';
import { createOrder } from '../Redux/Store/orderSlice';
import { AiOutlinePlus, AiOutlineMinus, AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeItem(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handlePlaceOrder = () => {
    if (!user) {
      alert("Please login to place an order!");
      return;
    }

    if (!user.address) {
      alert("Please update your delivery address in your profile!");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      restaurant: items[0].restaurant,
      items: items.map(item => ({
        menuItem: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: total,
      deliveryAddress: user.address
    };

    dispatch(createOrder(orderData));
    dispatch(clearCart());

    // Navigate to Orders page
    navigate('/orders');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600">Add delicious food from our restaurants!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 mt-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-green-600">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md flex items-center p-4 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600 mt-1">₹{item.price}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="px-2 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      <AiOutlinePlus />
                    </button>
                    <button
                      onClick={() => dispatch(removeItem(item._id))}
                      className="ml-auto text-red-500 hover:text-red-700 transition"
                    >
                      <AiFillDelete size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                {items.map(item => (
                  <div key={item._id} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 font-semibold"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
