import app from './src/app.js';
import dotenv from 'dotenv';
import connectDB from './src/db/db.js';  
dotenv.config();

const PORT = process.env.PORT || 3000;
connectDB(); // database se connect karne ke liye function call     
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})