import express from 'express';
import { createPortfolio, getPortfolio, updatePortfolio } from '../controllers/portfolio.controller.js';
const router = express.Router();

router.post('/', createPortfolio); // create portfolio
router.get('/:id', getPortfolio); // Get a portfolio by ID
router.put('/:id', updatePortfolio); // Update a portfolio


export default router;
