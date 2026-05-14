import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

async function registerUser(req, res) {
    const {userName, email, password, role="user"} = req.body;

    try {
        
        let user = await userModel.findOne({
            $or: [{ email }, { userName }]
        }); 
        
        if(user) {
            return res.status(409).json({
                message: "User already exists",
            })
        }

        const hash = await bcrypt.hash(password, 10);

        user = await userModel.create({
            userName, email, password: hash, role
        })

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET);

        // res.cookie('token', token);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        })

        res.status(201).json({
            message: 'User Created Sucecessfully',
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role
            },
            token,
        })


    } catch (error) {
        res.status(500).json({
            message: "Error in register controller"
        })
    }
}

export const loginUser = async(req, res) => {
    const {userName, email, password} = req.body;
    const user = await userModel.fincOne({
        $or: [
            {email}, {userName}
        ]
    });

    if(!user) return res.status(401).json({message: "Invalid Credentials"});

    const checkPasswordValidity = await bcrypt.compare(password, user.password);

    if(!checkPasswordValidity) return res.status(401).json({message: "Invalid Credentials"});

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET);

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    })

    res.status(200).json({
        message: "Login Successfull",
        user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role
        },
        token,
    });
}

export const logoutUser = async(req, res) => {
    res.clearCoolie('token');
    res.status(200).json({
        message: "Logout Successfull"
    });
}

export default registerUser;