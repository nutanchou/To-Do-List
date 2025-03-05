const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  console.log('Received request to register:', req.body);

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();
    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser };
