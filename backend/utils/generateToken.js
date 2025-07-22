import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {expiresIn:'28d'})
    res.cookie('jwt', token, { httpOnly: true, maxAge: 28 * 24 * 60 * 60 * 1000, sameSite: "strict", secure: process.env.NODE_ENV !=="development"});
};

export default generateTokenAndSetCookie;