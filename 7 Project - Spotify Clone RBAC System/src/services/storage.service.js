import { ImageKit } from "@imagekit/nodejs";

const imagekitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

const uploadFile = async(file) => {
    const result = await imagekitClient.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder: "spotify/music"
    });
    return result;
}

export default uploadFile;