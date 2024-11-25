// Portfolio Model
import mongoose from "mongoose";
const {Schema} = mongoose

const PortfolioSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
        unique: true, 
    },
    location: { type: String, required: false },
    contactInfo: { type: String, required: false },
    description: { type: String, required: false },
    skills: { type: [String], required: false }, // Array of skills
    links: [
        {
            title: { type: String, required: false },
            url: { type: String, required: true },
        }
    ]
    , // Array of URLs
    
}, { timestamps: true });


const portfolio = mongoose.model('Portfolio', PortfolioSchema);

export default portfolio;