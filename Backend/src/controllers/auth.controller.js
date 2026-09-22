import userModel from "../models/user.model.js"
import { registerSchema, loginSchema } from "../validator/auth.validator.js"
import { accessToken, accessToken, genrateToken, refreshToken, refreshToken, setAuthCookies } from "../utils/auth.utils.js"
import { json } from "zod"
import { config } from "dotenv"


async function registerUser(req, res) {
    try {

        const result = registerSchema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                message: "invalid input",
                errors: result.error.issues
            })
        }

        const { username, email, password } = result.data


        //check if user already exist 
        const existUser = await userModel.findOne({
            $or: [
                { email },
                { username }
            ]
        })

        if (existUser) {
            return res.status(409).json({ message: "user already exist " })
        }


        //create user
        const user = await userModel.create({
            username,
            email,
            password
        })

        //create jwt
        const accessToken= accessToken(user._id)
        const refreshToken=refreshToken(user._id)

        setAuthCookies(res, refreshToken)

        res.status(201).json({
            message: "you have been registered successfully",
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,

            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "server error"
        })
    }

}


async function loginUser(req, res) {

    try {
        const result = loginSchema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                message: "invalid input",
                errors: result.error.issues
            })
        }

        const { email, password } = result.data

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "invalid email or password"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "invalid email or password"
            });
        }

        const accessToken= accessToken(user._id)
        const refreshToken=refreshToken(user._id)

        setAuthCookies(res, refreshToken)

        res.status(200).json({
            message: "you have been loged successfully",
            accessToken
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "server error"
        })
    }

}

async function logoutUser(req,res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "lax"
        })

        return res.status(200).json({ message: "logout successfuly" })
    } catch (err) {
        return res.status(500), json({
            message: "something went wrong"
        })
    }
}


async function getMe(req,res) {
    res.status(200).json({message:"user fetched successfuly",
        user:req.user
    })
    
}

export { registerUser, loginUser ,logoutUser,getMe}