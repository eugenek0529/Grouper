import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();


const secretKey = process.env.JWT_SECRET; 

const authenticate = (req, res, next) => {

    const refreshToken = req.cookies.refreshToken;
   
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, secretKey, (err, user) => {
        if (err) {
            console.log('Error verifying refresh token:', err); // Log the error details
            return res.status(403).json({ err: 'Invalid or expired token' });

        }
        
        // console.log('user: ', user)
        // console.log('userID: ', user.userID)
        req.user = { id: user.userID, fullname: user.fullname };
        next();
    });
    
}

export default authenticate;
