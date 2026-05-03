import mongoose from "mongoose";
const schema = mongoose.Schema({
    image: String,
    caption: String,
});
const postsModel = mongoose.model('posts', schema); // posts -> collection ka naam, schema -> schema ka naam
export default postsModel;