const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const orderRoutes = require('./routes/order.routes');
const cartRoutes = require('./routes/cart.routes');
const { errorHandler, notFound } = require('./middleware/error');
const path = require("path");


dotenv.config();
const app = express();


app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));


app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);


app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 8080;
connectDB().then(() => {
app.listen(PORT, () => console.log(`API running on :${PORT}`));
});