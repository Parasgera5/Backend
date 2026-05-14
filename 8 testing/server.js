import app from './src/app.js';

app.listed(3000, () => {
    console.log("Server is running on port 3000");
});