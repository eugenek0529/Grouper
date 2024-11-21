import Portfolio from '../models/portfolio.model.js';
import User from '../models/user.model.js';

// get portfolio
export const getPortfolio = async (req, res) => {
    try {
        const { username } = req.params;

        // find the user via username
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Use the ID to pull portfolio
        const portfolio = await Portfolio.findOne({ userID: user._id });
        if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update portfolio by ID
export const updatePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, req.body, { new: true});
        if (!updatedPortfolio) return res.status(404).json({ message: 'Portfolio not found' });

        res.status(200).json({
            message: 'Portfolio updated successfully',
            portfolio: updatedPortfolio,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
