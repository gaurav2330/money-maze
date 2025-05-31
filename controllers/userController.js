const fs = require('fs');
const { sequelize, models } = require('../db');
const User = models.User;

exports.getAllUsers = async (req, res) => {
  // Get all users from the database
  try {
    const users = await User.findAll();
    res.status(200).json({ status: 'success', data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}
