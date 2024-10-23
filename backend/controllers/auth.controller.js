import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import generateTokenAndCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try{ 
        const {fullname, username, password} = req.body;

    // checks to see if username is already taken
    const user = await User.findOne({username});
    if (user)
    {return res.status(400).json({error:"Username already exists"})}
    
    // hash password 
    const hashedPoassword = await bcrypt.hash(password, 10);

    // new user
    const newUser = new User
        ({fullname,username,password: hashedPoassword});
    
    // save new user
    if (newUser){
    generateTokenAndCookie(newUser._id,res);
    await newUser.save();

    res.status(200).json({
        _id: newUser._id, 
        fullname: newUser.fullname, 
        username: newUser.username, 
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

    generateTokenAndCookie(user._id,res);
    res.status(200).json({
        _id: user._id, 
        fullname: user.fullname, 
        username: user.username
    });

    }
    catch(error){res.status(500).json({error:"error...idk"})}
};

export const logout = (req,res) => {
    try{
        res.cookie("jwt","",{maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    }
    catch (error){
        res.status(500).json({error: "Internal Server Error...idk"});
    }
};