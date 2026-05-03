const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB(); // database se connect karne ke liye

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});