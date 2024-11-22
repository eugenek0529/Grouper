// Post model
import mongoose from "mongoose";
const {Schema} = mongoose

const PostSchema = new Schema({
    title: {
        type:String, 
        required: true}, 
    creatorId: {
        type:Schema.Types.ObjectId, 
        ref: 'User', 
        required: true},
    description: {
        type:String, 
        required: true}, 
    location: {
        type: String, 
        required: true,
    }, 
    meetingStyle: {
        type: String, 
        required: true,
        enum: ['in-person', 'online', 'hybrid'],
    },
    tags: [{ 
        type: String,
        default: [] // default is empty array
    }],
    capacity: {
        type: Number,
        required: true,
    }, 
    project_status: {
        type: String, 
        enum: ['open', 'closed', 'in-progress'],
        default: 'open',
    }, 
    applicants: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        default: [] // default is empty array
    }],
    members: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        default: [] // default is empty array
    }],
}, { timestamps: true }) 

const Post = mongoose.model('Post', PostSchema);  //  Post is now collection name in db

export default Post;
