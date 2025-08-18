const jwt = require('jsonwebtoken');
const { z } = require('zod');
const User = require('../models/User');
const { send } = require('../utils/sendResponse');

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

exports.register = async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  const { name, email, password } = parsed.data;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already used' });
  const user = await User.create({ name, email, password });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  return send(res, { token, user: { id: user._id, name, email, role: user.role } }, 'Registered', 201);
};

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
exports.login = async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  return send(res, { token, user: { id: user._id, name: user.name, email, role: user.role } }, 'Logged in');
};

exports.me = async (req, res) => send(res, req.user, 'Me');
