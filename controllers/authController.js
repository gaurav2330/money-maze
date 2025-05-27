const jwt =  require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { sequelize, models } = require('../db');
const User = models.User;

exports.signup = async (req, res) => {
  const { name, username, password } = req.body;
  
  // Check if all required fields are provided
  if (!name || !username || !password) {
    return res.status(400).json({ status: 'fail', message: 'Please provide name, username and password' });
  }
  let hashedPassword = bcrypt.hashSync(password, 10);

  // Check if user already exists
  const userExists = await User.findOne({ where: { username } });
  if (userExists) {
    return res.status(400).json({ status: 'fail', message: 'User already exists' });
  }

  // Create new user
  let user;
  try {
    user = await User.create({ name, username, password: hashedPassword })
    console.log(user, 'user created')
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }

  // Generate JWT token
  const token = jwt.sign({ name, username }, 'gauri21', { expiresIn: '30d' });

     // Set the token in a cookie
    res.cookie('money_maze_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000 // 1 hour
    });

  res.status(201).json({ status: 'success', token, data: user }); 
}

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Check if all required fields are provided
  if (!username || !password) {
    return res.status(400).json({ status: 'fail', message: 'Please provide username and password' });
  }

  // Check if user exists
  const user = await User.findOne({ where: { username } })
  if (!user) {
    return res.status(401).json({ status: 'fail', message: 'Invalid username or password' });
  }

  // Check if password is correct
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Internal server error'});
    }
    if (!result) {
      return res.status(401).json({ status: 'fail', message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ name: user.name, username: user.username }, 'gauri21', { expiresIn: '1h' });

    // Set the token in a cookie
    res.cookie('money_maze_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    res.status(200).json({ status: 'success', token });
  })
}

exports.logout = (req, res) => {
  const token = req.headers['authorization'];

  // make the token invalid
  let expiredToken = jwt.sign({ name: req.user.name, username: req.user.username}, 'gauri', { expiresIn: '0s' });
  res.status(200).json({ status: 'success', message: 'Logged out successfully', token: expiredToken});
}

exports.validateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ status: 'fail', message: 'No token provided' });
  }
  jwt.verify(token, 'gauri21', (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: 'fail', message: 'Invalid token' });
    }
    res.status(200).json({ status: 'success', message: 'Token is valid', user: decoded });
  })
}

const generateUUID = () => {
  let random_string = Math.random().toString(36).substring(2, 15);
  return random_string + Date.now();
}