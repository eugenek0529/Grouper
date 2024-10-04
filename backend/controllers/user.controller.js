import bcrypt from "bcryptjs"; 
import User from "../models/user.model.js";

// register handler
export const registerUser = async (req, res) => {
    try {
        const {fullname, username, password} = req.body; 

        // check if user already exist before register
        const user = await User.findOne({username}); 
        if (user) {
            return res.status(400).json({error:"username already in use"}); 
        }

        // register new user
        // 1. encrypt password using bcrypt 
        const hashedPoassword = await bcrypt.hash(password, 10); // 10 is salt

        // 2. create new user schema
        const newUser = new User({fullname, username, password: hashedPoassword}); 
        if (newUser) {
            await newUser.save(); 
            
            // return json for testing
            res.status(200).json({
                _id: newUser._id, 
                fullname: newUser.fullname, 
                username: newUser.username, 
                message: "New user created successfully"
            })
        } else {
            res.status(400).json({error: "Failed to create new user due to invaild data"});
        }
        

    } catch (err) {
        res.status(500).json({ error: err.message });

    }
}