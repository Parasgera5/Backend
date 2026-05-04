import express from 'express';
import multer from 'multer';
// import uploadImage from './services/storage.service';
import uploadImage from './services/storage.service.js';
import postsModel from './models/post.model.js';
import cors from 'cors';

const app = express();
app.use(cors()); // ye line hume cross-origin resource sharing (CORS) ko enable karne me madad karegi, jisse hum apne frontend application se backend API ko access kar sakte hai. without this line, hum apne frontend application se backend API ko access nahi kar paenge, kyunki browser security ke wajah se cross-origin requests ko block kar deta hai. therefore, agar aap apne frontend application se backend API ko access karna chahte hai, to aapko app.use(cors()) ko apne express app me include karna zaroori hai.
app.use(express.json()); // it is a middleware that helps us to parse the incoming request body as JSON. when we send data from the client in JSON format, this middleware will parse that data and convert it into a JavaScript object that we can access through req.body. without this middleware, req.body would be undefined, and we wouldn't be able to access the data sent from the client. therefore, if you want to handle JSON data in your express app, it is essential to include app.use(express.json()) in your app setup. raw format ka data in json jo hum postman se send karte hai uski baat ho rahi hai wo padne ke liye ye middleware use karna zaroori hai.

const upload = multer({
    storage: multer.memoryStorage(), // ye line hume file ko memory me store karne me madad karegi, isse file ko disk me store nahi karna padega, aur hum file ko directly memory se read kar sakte hai.
})


// lekin hume ab form-data format me data bhejna hai, kyunki hume image bhi upload karni hai. form-data format me data bhejne ke liye hume multer package ka use karna padega. multer package hume file upload karne me madad karega.

// app.post('/create-post', async (req, res) => {
//     console.log(req.body); // undefined as the data type is form-data, so we need to use multer to parse the form-data.
// });

app.post('/create-post', upload.single('image'), async (req, res) => {
    console.log(req.body); // ab hume form-data format me data mil raha hai, aur image bhi upload ho rahi hai. upload.single('image') -> ye line hume multer ko batati hai ki hum ek single file upload kar rahe hai, aur us file ka naam 'image' hai. isse multer ko pata chal jata hai ki hume form-data me se 'image' naam ke field se file ko read karna hai. although abhi bhi image nahi milegi but upload hogi
    
    // image ko lane ke liye below line of code
    console.log(req.file); // ye line hume uploaded file ke baare me information dega, jaise ki file ka naam, size, mimetype, etc. kyunki humne multer ko memory storage use karne ke liye bola hai, isliye file ka content bhi req.file.buffer me milega.
    
    const result = await uploadImage(req.file.buffer); // ye line hume uploaded image ka URL dega, kyunki uploadImage function me humne imagekit client ka use karke image ko upload karne ke baad uska URL return karne ke liye bola hai.

    console.log(result); // ye line hume image upload karne ke baad result dega, jisme image ka URL bhi hoga.

    const post = await postsModel.create({
        image: result.url, // ye line hume uploaded image ka URL dega, jise hum apne database me store kar sakte hai.
        caption: req.body.caption, // ye line hume form-data me se caption field se data dega, jise hum apne database me store kar sakte hai.
    })

    return res.status(201).json({
        message: "Post created successfully",
        post,
    })

});

app.get('/posts', async (req, res) => {
    const posts = await postsModel.find();
    return res.status(200).json({
        message: "Posts fetched successfully",
        posts,
    })
});

export default app;