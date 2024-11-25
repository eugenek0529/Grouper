import Portfolio from '../models/portfolio.model.js';
import User from '../models/user.model.js';

// get portfolio
export const getPortfolio = async (req, res) => {
    try {
        const { userID } = req.params;

        // find the user via username
        const user = await User.findById(userID);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Use the ID to pull portfolio
        const portfolio = await Portfolio.findOne({ user: userID })
        
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

        // get the payload
        const { location, contactInfo, skills, links } = req.body;

        // check the skills list
        if (skills && (!Array.isArray(skills) || skills.length > 5)) {
            return res.status(400).json({
                message: 'Skills must be an array with a maximum of 5 items.',
            });
        }

        // validate the links 
        if (links && (!Array.isArray(links) || links.some(link => !link.title || typeof link.url !== 'string'))) {
            return res.status(400).json({
                message: 'Links must be an array of objects with "title" and a valid "url".',
            });
        }

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
            id, 
            { location, contactInfo, skills, links },
            { new: true});
        if (!updatedPortfolio) return res.status(404).json({ message: 'Portfolio not found' });

        res.status(200).json({
            message: 'Portfolio updated successfully',
            portfolio: updatedPortfolio,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
