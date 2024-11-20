import Portfolio from '../models/portfolio.model.js';

// create Portfolio
export const createPortfolio = async (req, res) => {

    

    const { fullname, location, contactInfo, description, skills, links, projects } = req.body;

    try {
        const newPortfolio = new Portfolio({ fullname, location, contactInfo, description, skills, links, projects });
        await newPortfolio.save();
        res.status(201).json({ message: 'Portfolio created successfully', portfolio: newPortfolio });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get Portfolio
export const getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ _id: req.params.id });
        if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update Portfolio
export const updatePortfolio = async (req, res) => {
    try {
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPortfolio) return res.status(404).json({ message: 'Portfolio not found' });
        res.status(200).json(updatedPortfolio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
