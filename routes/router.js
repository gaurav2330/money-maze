const express = require('express');
const router = express.Router();

const { signup, login, logout, validateToken } = require('../controllers/authController')
const { getAllUsers } = require('../controllers/userController');
const { createBudget, showBudget, getBudgets, deleteBudget } = require('../controllers/budgetController');
const { createTransaction, getTransactions, showTransaction, deleteTransaction } = require('../controllers/transactionController');

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/validateToken', validateToken);

// User routes
router.get('/users', getAllUsers);

// Budget routes
router.post('/budgets', createBudget);
router.put('/budgets/:id', updateBudget); // Assuming this is for updating a budget
router.get('/budgets', getBudgets);
router.get('/budgets/:id', showBudget);
router.delete('/budgets/:id', deleteBudget);

// Transaction routes
router.post('/transactions', createTransaction);
router.get('/transactions', getTransactions);
router.get('/transactions/:id', showTransaction);
router.delete('/transactions/:id', deleteTransaction);

module.exports = router;