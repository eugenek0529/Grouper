// User model
import mongoose from "mongoose";
const {Schema} = mongoose

const UserSchema = new Schema({
    fullname: {type:String, required: true}, 
    username: {type:String, required: true, unique: true},
    password: {type:String, required: true}, 
}, { timestamps: true }) 

const User = mongoose.model('User', UserSchema); 

export default User;