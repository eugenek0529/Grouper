import express from 'express';
import { getPortfolio, updatePortfolio } from '../controllers/portfolio.controller.js';
const router = express.Router();

router.get('/:userID', getPortfolio); // Get a portfolio by ID
router.put('/update/:id', updatePortfolio); // Update a portfolio


export default router;
