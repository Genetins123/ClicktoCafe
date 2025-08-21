const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Use the static login method from userModel
    const oldUser = await userModel.login(email, password);

    // Create token
    const token = createToken(oldUser._id);

    // Send back name + email + token
    res.status(200).json({
      _id: oldUser._id,
      email: oldUser.email,
      name: oldUser.name, // ✅ changed from username
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup user
const signupUser = async (req, res) => {
  const { name, email, password } = req.body; // ✅ changed username → name

  try {
    const newUser = await userModel.signup(name, email, password);
    const token = createToken(newUser._id);

    // Send back name + email + token
    res.status(200).json({
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name, 
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
