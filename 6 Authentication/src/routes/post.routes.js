import express from "express";
import jwt from 'jsonwebtoken';
import userModel from "../models/user.model.js";

const router = express.Router();

router.post("/create", async (req, res) => {
    // console.log(req.body);
    // console.log(req.cookies);
    // res.send("Post Created");
    
    const token = req.cookies.token;
    if(!token){ // checking ki kya token hai
        return res.status(401).json({
            message: "Unauthorized",
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // decoded ek object hoga jisme ek id hogi jo -> user._id hai jo token generation ke time pe use ki thi and dusra isme iat hoga => kis time pe wo token generate hua tha.
        console.log("Decoded Token: ", decoded);

        const user = await userModel.findOne({
            _id: decoded.id
        })
        
        console.log(user);

    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token",
        })
    }

    
    res.send("Post Created");

})
export default router;