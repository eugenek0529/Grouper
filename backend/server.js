import express from 'express'; 
import cors from 'cors';
import dotenv from "dotenv";

import connectToDB from "./database/connectToDB.js"
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import tagsRoutes from "./routes/tags.routes.js";
import postRoutes from "./routes/post.routes.js";
import portfolioRoutes from './routes/portfolio.routes.js';


// app setup
dotenv.config();  
const app = express();  
const SERVER_PORT = process.env.SERVER_PORT;  
const APP_PORT = process.env.APP_PORT;  


// middleware
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)

app.use(cors({
    origin: `http://localhost:${APP_PORT}`,  // Set the exact origin instead of '*'
    credentials: true,                // Allow cookies and other credentials
}))


// Start app
app.listen(SERVER_PORT, () => {
    connectToDB(); 
    console.log(`server is connected to ${SERVER_PORT}`);
})

// Checking if I can push changes
// Checking changes - Leo

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); 
app.use("/api/tags", tagsRoutes); 
app.use("/api/posts", postRoutes); 
app.use('/api/portfolio', portfolioRoutes);
