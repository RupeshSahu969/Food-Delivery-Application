const jwt = require('jsonwebtoken');
const { z } = require('zod');
const User = require('../models/User');
const { send } = require('../utils/sendResponse');

// Validation Schemas
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().optional().default("customer") // Optional role, defaults to 'customer' if not provided
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

// Generate JWT Token
const genToken = (id, email, role, name) => {
  const expiresIn = process.env.JWT_EXPIRES_IN || '130d'; // Default to 130 days if not set
  return jwt.sign({ id, email, role, name }, process.env.JWT_SECRET, { expiresIn });
};

// Register a new user
exports.register = async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const { name, email, password, role } = parsed.data;

  const userRole = role && ["admin", "restaurant", "customer"].includes(role) ? role : "customer";

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already used' });

  // Create the user with the proper role
  const user = await User.create({ 
    name, 
    email, 
    password, 
    role: userRole
  });

  const token = genToken(user._id, user.email, user.role, user.name);

  return send(
    res,
    { 
      token, 
      user: { 
        id: user._id, 
        name, 
        email, 
        role: user.role 
      }
    },
    'Registered',
    201
  );
};

// Login user
exports.login = async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = genToken(user._id, user.email, user.role, user.name);

  return send(
    res,
    { 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    },
    'Logged in'
  );
};

// Current User
exports.me = async (req, res) => {
  return send(res, req.user, 'Me');
};
