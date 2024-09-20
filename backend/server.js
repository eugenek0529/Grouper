import express from 'express'; 
import cors from 'cors';
import dotenv from "dotenv";

// app setup
dotenv.config();  
const app = express();  
const SERVER_PORT = process.env.SERVER_PORT;  
const APP_PORT = process.env.APP_PORT;  


// middleware
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use(cors({
    origin: `http://localhost:${APP_PORT}`,  // Set the exact origin instead of '*'
    credentials: true,                // Allow cookies and other credentials
}))


// Start app
app.listen(SERVER_PORT, () => {
    connectToDB(); 
    console.log(`server is connected to ${SERVER_PORT}`);
})