import jwt from "jsonwebtoken"
import config from "../config/config.js";

const authMiddleware = async (req, res, next) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "unotherized" })
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({ message: "invalid or expired user" })
    }
}

export default authMiddleware;