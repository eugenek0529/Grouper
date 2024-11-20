// Portfolio Model
import mongoose from "mongoose";
const {Schema} = mongoose

const PortfolioSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    location: { type: String, required: false },
    contactInfo: { type: String, required: false },
    description: { type: String, required: false },
    skills: { type: [String], required: false }, // Array of skills
    links: { type: [String], required: false }, // Array of URLs
    projects: [
        {
            name: { type: String, required: true },
            description: { type: String, required: false },
            role: { type: String, required: false },
        },
    ], // Projects array
}, { timestamps: true });


const portfolio = mongoose.model('Portfolio', PortfolioSchema);

export default portfolio;