import jwt from 'jsonwebtoken'

const generateTokenAndCookie = (userID, fullname , res) => 
{
    
    const refreshToken = jwt.sign({userID, fullname}, process.env.JWT_SECRET,
                                {expiresIn: '1d'})



    res
    .cookie("refreshToken",refreshToken,{
        //Age is taken in milliseconds (cursed), this is 1m
        maxAge: 24 * 60 * 60 * 1000, 
        // prevent attacks
        httpOnly: true, 
        sameSite: "strict", 
        secure: process.env.NODE_ENV !== "development"
    });


};

export default generateTokenAndCookie;