// Tag collection
// postIds is array of postIds that contains the tags, used for query

import mongoose from "mongoose";
const {Schema} = mongoose

const tagSchema = new Schema({
    skill: {type:String, required: true, unique: true}, 
    postIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts', 
    }]

}, { timestamps: true }) 

const Tag = mongoose.model('Tag', tagSchema); 

export default Tag;