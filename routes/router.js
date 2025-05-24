const express = require('express');
const router = express.Router();

const { signup, login, logout } = require('../controllers/authController')
const { getAllUsers } = require('../controllers/userController');
const { createBudget, getBudget } = require('../controllers/budgetController');

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// User routes
router.get('/users', getAllUsers);

// Budget routes
router.post('/budgets', createBudget);
router.get('/budgets/:id', getBudget);

module.exports = router;