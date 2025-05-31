const { sequelize, models } = require('../db');
const User = models.User;
const Transaction = models.Transaction;

exports.createTransaction = async (req, res) => {
  const { budgetId, amount, date, description } = req.body;

  // Check if all required fields are provided
  if (!budgetId || !amount) {
    return res.status(400).json({ status: 'fail', message: 'Please provide userId, budgetId, amount, date and description' });
  }

  const username = req.user.username;
  const user = await User.findOne({ where: { username } });
  const userId = user.id;

  // Create new transaction
  let transaction;
  try {
    transaction = await Transaction.create({ userId, budgetId, amount, description });
    console.log('transaction created');
  } catch (error) {
    console.error('Error creating transaction:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }

  res.status(201).json({ status: 'success', data: transaction });
}

exports.getTransactions = async (req, res) => {
  try {
    const budgetId = req.query.budgetId;
    const transactions = await Transaction.scope('withUserAndBudget').findAll({
      where: {
        ...(budgetId && { budgetId })
      }
    });
    res.status(200).json({ status: 'success', data: transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

exports.showTransaction = async (req, res) => {
  const { id } = req.params;
  let transaction;

  try {
    transaction = await Transaction.scope('withUserAndBudget').findByPk(id);
    if (!transaction) {
      return res.status(404).json({ status: 'fail', message: 'Transaction not found' });
    }
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }

  res.status(200).json({ status: 'success', data: transaction });
}

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  let transaction;

  try {
    transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ status: 'fail', message: 'Transaction not found' });
    }
    await transaction.destroy();
    console.log('Transaction deleted:', transaction.id);
    res.status(200).json({ status: 'success', message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}