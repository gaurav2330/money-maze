const { sequelize, models } = require('../db');
const Budget = models.Budget;

exports.createBudget = async (req, res) => {
  const { name, value, frequency, currency } = req.body;

  // Check if all required fields are provided
  if (!name || !value || !frequency || !currency) {
    return res.status(400).json({ status: 'fail', message: 'Please provide name, value, frequency and currency' });
  }

  // Create new budget
  let budget;
  try {
    budget = await Budget.create({ name, value, frequency, currency });
    console.log(budget, 'budget created');
  } catch (error) {
    console.error('Error creating budget:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }

  res.status(201).json({ status: 'success', data: budget });
}