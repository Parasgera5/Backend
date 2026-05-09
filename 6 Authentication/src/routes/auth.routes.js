import express from 'express';
import { registerUser } from '../controllers/auth.controller.js';
const router = express.Router();

// router.post('/register', (req, res) => {
//     const {userName, email, password} = req.body;

// });
router.post('/register', registerUser);
router.get('/test', (req, res) => {
    console.log("Cookies: ", req.cookies)
    res.json({
        message: "Test Route",
        cookies: req.cookies,
    })
});

export default router;