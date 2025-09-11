import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Redux/Store/authSlice';

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return [value, handleChange];
};

const Register = () => {
  const [name, setName] = useFormInput('');
  const [email, setEmail] = useFormInput('');
  const [phone, setPhone] = useFormInput('');
  const [address, setAddress] = useFormInput('');
  const [password, setPassword] = useFormInput('');
  const [confirmPassword, setConfirmPassword] = useFormInput('');
  const [message, setMessage] = useState(null); // For success/error messages

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: "Passwords don't match!" });
      return;
    }

    const formData = { name, email, phone, address, password };

    try {
      const result = await dispatch(registerUser(formData));
      
      // Handling success and error response
      if (result.error) {
        setMessage({ type: 'error', text: result.error.message || "Something went wrong!" });
      } else {
        setMessage({ type: 'success', text: 'Registration successful! Redirecting...' });
        setTimeout(() => navigate('/'), 3000);  // Redirect after 3 seconds
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Something went wrong!' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        {/* Branding or Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Zomato" className="h-12" />
        </div>

        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Account</h2>

        {/* Show success or error message */}
        {message && (
          <div className={`bg-${message.type === 'error' ? 'red' : 'green'}-100 border border-${message.type === 'error' ? 'red' : 'green'}-400 text-${message.type === 'error' ? 'red' : 'green'}-700 px-4 py-3 rounded mb-4`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={setName}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={setEmail}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={setPhone}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={address}
                onChange={setAddress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                required
                rows="3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={setPassword}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={setConfirmPassword}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-500 hover:text-green-600">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
