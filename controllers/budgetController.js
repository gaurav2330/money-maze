const { sequelize, models } = require('../db');
const Budget = models.Budget;
const User = models.User;

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
    console.log('budget created');
  } catch (error) {
    console.error('Error creating budget:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }

  // Associate budget with user
  const username = req.user.username;
  try {
    const user = await sequelize.models.User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }
    await budget.addUser(user);
  } catch (error) {
    console.error('Error associating budget with user:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }

  res.status(201).json({ status: 'success', data: budget });
}

exports.getBudgets = async (req, res) => {
  const username = req.user.username;
  // get all budgets associated with the user
  try {
    const user = await User.scope('withBudgets').findOne({ where: { username } });

    const budgets = user ? user.budgets : [];
    res.status(200).json({ status: 'success', data: budgets });
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

exports.showBudget = async (req, res) => {
  // get budget
  const { id } = req.params;
  let budget;

  try {
    budget = await Budget.findByPk(id);
    if (!budget) {
      return res.status(404).json({ status: 'fail', message: 'Budget not found' });
    }
  } catch (error) {
    console.error('Error fetching budget:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
  res.status(200).json({ status: 'success', data: budget });
} 

exports.deleteBudget = async (req, res) => {
  const { id } = req.params;
  let budget;

  try {
    budget = await Budget.findByPk(id);
    if (!budget) {
      return res.status(404).json({ status: 'fail', message: 'Budget not found' });
    }
    await budget.destroy();
    console.log('Budget deleted:', budget.id);
  } catch (error) {
    console.error('Error deleting budget:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }

  res.status(204).json({ status: 'success', message: 'Budget deleted successfully' });
}