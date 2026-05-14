import express from 'express'
import registerUserValidationRules from './middlewares/validation.middleware';

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello World"
    });
});

app.post("/resgister", registerUserValidationRules, (req, res) => {
    const {username, email, password} = req.body;

    res.status(201).json({
        message: "User Registered Successfully"
    });
});

export default app;