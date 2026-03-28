const express = require('express');
const app = express(); // isse server create hota hai, and wo server humne app mein store kara liya. Jab hum express ko call karte hai toh ek serve ka instance crete kar rahe hote hai hum and usko ek variable ke andar store kara lete hai.
app.get("/", (req, res) => { // req => request(jo data frontend se aa sakta hai, we can only access that data using req), res => response(jo data aaya hai req se usko repond karte hai using res)
    res.send("Hello World");
})
app.get("/about", (req, res) => {
    res.send("About Page");
})
app.listen(3000, () => { // ye server start karta hai, 3000 is the port number.
    console.log("Server is running on port 3000");
})