const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve the user, making sure to get username and other info
    const oldUser = await userModel.login(email, password); 
    
    // Create token
    const token = createToken(oldUser._id);
     
    // Send back the username along with email and token
    res.status(200).json({ 
      _id: oldUser._id,
      email: oldUser.email, 
      username: oldUser.username, // Include username in response
      token 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await userModel.signup(email, password, username);
    const token = createToken(newUser._id);
    
    // Send back the username along with email and token
    res.status(200).json({ 
      email: newUser.email, 
      username: newUser.username, 
      token 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};







module.exports = { signupUser, loginUser };
 