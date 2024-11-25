import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import generateTokenAndCookie from '../utils/generateToken.js';
import Portfolio from '../models/portfolio.model.js';
import jwt from "jsonwebtoken"; 

export const signup = async (req, res) => {
    try{ 
    const {fullname, username, password} = req.body;
    
    // checks to see if username is already taken
    const user = await User.findOne({username});
    if (user)
    {return res.status(400).json({error:"Username already exists"})}
    
    // hash password 
    const hashedPassword = await bcrypt.hash(password, 10);
    // new user
    const newUser = new User({fullname,username,password: hashedPassword});

    // save new user
    if (newUser){
   
    await newUser.save();

    // initiate new portfolio
    const newPortfolio = await Portfolio.create({
        user: newUser._id,
        location: "",
        contactInfo: "",
        description: "",
        skills: [],
        links: []
    });

    newUser.portfolioId = newPortfolio._id;
    await newUser.save(); 

    generateTokenAndCookie(newUser._id, newUser.fullname, res);


    res.status(200).json({
        _id: newUser._id, 
        fullname: newUser.fullname, 
        username: newUser.username, 
        portfolioId: newUser.portfolioId,
        message: "New user created successfully"
    })}
    else {res.status(400).json({error: "Invalid user data"});}

    }catch(error)
    {res.status(500).json({error:"error...idk"})} 
};

export const login = async (req, res) => {
    try{
    const {username,password} = req.body;
    const user = await User.findOne({username});
    const CorrectPassword = await bcrypt.compare(password, user?.password || "");

    if (!user || !CorrectPassword)
    {return res.status(400).json({error: "Invalid username or password"});}

    generateTokenAndCookie(user._id, user.fullname,res);
    res.status(200).json({
        _id: user._id, 
        fullname: user.fullname, 
        username: user.username, 
        portfolioId: user.portfolioId,
    });

    }
    catch(error){res.status(500).json({error:"error...idk"})}
};

export const verify = async (req, res) => {
    // if token is valid, enter here
    // res.status(200).json({ userId: req.user.id });

    try {
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username, 
            portfolioId: user.portfolioId,
        });
    } catch (error) {
        res.status(500).json({ error: "Server error during verification" });
    }

}


export const logout = (req,res) => {
    try{
        res.cookie("refreshToken","",{maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    }
    catch (error){
        res.status(500).json({error: "Internal Server Error...idk"});
    }
};
