const express = require('express');
const router = express.Router();

const { signup, login, logout, validateToken } = require('../controllers/authController')
const { getAllUsers } = require('../controllers/userController');
const { createBudget, getBudget } = require('../controllers/budgetController');
const { createTransaction } = require('../controllers/transactionController');

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/validateToken', validateToken);

// User routes
router.get('/users', getAllUsers);

// Budget routes
router.post('/budgets', createBudget);
router.get('/budgets/:id', getBudget);

// Transaction routes
router.post('/transactionn', createTransaction);

module.exports = router;