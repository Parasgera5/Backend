import express from 'express';
import { registerUser } from '../controllers/auth.controller';
const router = express.Router();

// router.post('/register', (req, res) => {
//     const {userName, email, password} = req.body;

// });
router.post('/register', registerUser);

export default router;