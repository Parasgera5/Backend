import express from 'express';
import registerUser, { logoutUser } from '../controllers/auth.controller.js';
import {loginUser} from '../controllers/auth.controller.js';

const router = express.Router();
// router.post('/register', (req, res) => {
    //     let user = await userModel.findOne({
        //         userName: req.userName
        //     })
        // })
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;