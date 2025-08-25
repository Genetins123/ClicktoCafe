const express = require('express');
const router = express.Router();

// controllers
const { signupUser, loginUser } = require('../controllers/userController');
const userModel = require('../models/userModel');

// login route
router.post('/login', loginUser);

// signup route
router.post('/sign-up', signupUser);

// ✅ GET all users
router.get('/', async (req, res) => {
  try {
    const users = await userModel.find({}, { password: 0 }); // password exclude
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ✅ GET single user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id, { password: 0 });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});
// ✅ DELETE user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: '✅ User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});
// ✅ DELETE all users
router.delete('/', async (req, res) => {
  try {
    await userModel.deleteMany({});
    res.status(200).json({ message: '✅ All users deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete all users' });
  }
});

// ✅ UPDATE user by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // DB la update
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true, runValidators: true, select: "-password" } // password exclude
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    } 

    res.status(200).json({ message: '✅ User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

module.exports = router;
