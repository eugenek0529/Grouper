import jwt from 'jsonwebtoken'

const generateTokenAndCookie = (userID, res) => 
{
    const token = jwt.sign({userID}, process.env.JWT_SECRET,
    {expiresIn: '15d'
    })
    res.cookie("jwt",token,{
        //Age is taken in milliseconds (cursed), this is 15d
        maxAge: 15 * 24 * 60 * 60 * 1000, 
        // prevent attacks
        httpOnly: true, 
        sameSite: "strict", 
        secure: process.env.NODE_ENV !== "development"
    });
};

export default generateTokenAndCookie;