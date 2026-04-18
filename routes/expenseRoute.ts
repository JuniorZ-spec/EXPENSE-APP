const express = require('express');
const router = express.Router();
import { createExpense, getAllExpenses, oneExpense, updateExpense, deleteExpense } from '../controllers/expensesControllers';

router.post('/create', createExpense);
router.get('/all', getAllExpenses);
router.get('/:id', oneExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

