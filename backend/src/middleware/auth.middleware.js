import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const  protectRoute = async (req, res, next) => {
    const { jwt: token } = req.cookies;
    if (token) {        
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({message: "Unauthorized"});
            } else {
                const user = await User.findById(decodedToken.userId).select("-password");
                if (!user) {
                    return res.status(401).json({message: "Unauthorized"});
                }
                req.user = user;
                next();
            }
        });
    } else {
        return res.status(401).json({message: "Unauthorized"});
    }
};
export default protectRoute;