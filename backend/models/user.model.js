// User model
import mongoose from "mongoose";
const {Schema} = mongoose

const UserSchema = new Schema({
    fullname: {type:String, required: true}, 
    username: {type:String, required: true, unique: true},
    password: {type:String, required: true}, 
    joined: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Post',
        default: [] // default is empty array
    }],
    applied: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Post',
        default: [] // default is empty array
    }],
    portfolioId: {
        type: Schema.Types.ObjectId, 
        ref: 'Portfolio',
    }
}, { timestamps: true }) 

const User = mongoose.model('User', UserSchema);  //  User is now collection name in db

export default User;
