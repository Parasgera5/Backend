import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
});
const userModel = mongoose.model('users', userSchema); // users -> collection ka naam, schema -> schema ka naam
export default userModel;