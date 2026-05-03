import { ImageKit } from "@imagekit/nodejs/index.js";
import dotenv from 'dotenv';
dotenv.config();

const imagekit = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

async function uploadImage(buffer) {
    const result = await imagekit.files.upload({
        file: buffer.toString('base64'), // convert the buffer to base64 string
        fileName: 'image.jpg',
    })
    return result;
}
export default uploadImage;