import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
});
const userModel = mongoose.model('users', userSchema); // users -> collection ka naam, schema -> schema ka naam
export default userModel;