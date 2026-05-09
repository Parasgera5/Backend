import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';

async function registerUser(req, res) {
    const {userName, email, password} = req.body;

    let user = await userModel.findOne({
        $or: [{ email }, { userName }]
    });

    if(user){
        return res.status(409).json({
            message: "User already exists",
        })
    }

    user = await userModel.create({
        userName, email, password        
    })

    const token = jwt.sign({ // payload -> data, secret key, options -> expiry time, algorithm, etc
        id: user._id,
    }, process.env.JWT_SECRET);

    res.cookie('token', token, {
        httpOnly: true, // client side se access nahi kar sakte, security ke liye
        secure: process.env.NODE_ENV === 'production', // production me secure cookie, development me nahi
        sameSite: 'strict', // CSRF attack se bachne ke liye
    })

    res.status(201).json({
        message: 'User Created Sucecessfully',
        user,
        token,
    })
}
export {registerUser};