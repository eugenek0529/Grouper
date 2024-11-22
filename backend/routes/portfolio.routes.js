import express from 'express';
import { getPortfolio, updatePortfolio } from '../controllers/portfolio.controller.js';
const router = express.Router();

router.get('/:id', getPortfolio); // Get a portfolio by ID
router.put('/:id', updatePortfolio); // Update a portfolio


export default router;
