import jwt from "jsonwebtoken"
import config from "../config/config.js";

const accessToken=(userId)=>{
    return jwt.sign({
        id:userId
    },config.ACCESS,
    {
        expiresIn:"15m"
    }
);
};
const refreshToken=(userId)=>{
    return jwt.sign({
        id:userId
    },config.REFRESH,
    {
        expiresIn:"7d"
    }
);
};

const setRefreshToken=(res,token)=>{
    res.cookie("refreshToken",token,{
        httpOnly:true,
        secure:config.NODE_ENV==="production",
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    });
};

export {accessToken,refreshToken,setRefreshToken};