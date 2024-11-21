import bcrypt from "bcryptjs"; 
import User from "../models/user.model.js";
import Portfolio from "../models/portfolio.model.js";

// register handler
export const registerUser = async (req, res) => {
    try {
        const { fullname, username, password } = req.body;

        // check if user already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already in use" });
        }

        // encrypt password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt

        // create new user schema
        const newUser = new User({ fullname, username, password: hashedPassword });
        if (!newUser) {
            return res.status(400).json({ error: "Failed to create new user due to invalid data" });
        }

        await newUser.save();
        // create a portfolio after user is saved
        try {
            const newPortfolio = new Portfolio({ fullname: newUser.fullname });
            await newPortfolio.save();

            return res.status(201).json({
                message: "New user and portfolio created successfully",
                user: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    username: newUser.username,
                },
                portfolio: newPortfolio,
            });
        } catch (error) {
            return res.status(500).json({ error: `User created, but portfolio creation failed: ${error.message}` });
        }

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


export const getUsers = async (req, res) => {
    try {
    const user = await User.find();
    res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
