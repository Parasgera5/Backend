import musicModel from "../models/music.model";
import jwt from 'jsonwebtoken';
import uploadFile from "../services/storage.service";
import albumModel from "../models/album.model";

const createMusic = async (req, res) => {

        const { title, uri } = req.body;
        const file = req.file;

        const result = await uploadFile(file.buffer.toString('base64'));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user.id
        });

        res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                title: music.title,
                uri: music.uri,
                artist: music.artist

            }
        });
}

export const createAlbum = async (req, res) => {

        const { title, musicIds } = req.body;
        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics: musicIds
        });
        res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        });
}
// const createMusic = async (req, res) => {

//     const token = req.cookies.token;
//     if (!token) return res.status(401).json({ message: "Unauthorized" });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (decoded.role !== 'artist') return res.status(403).json({ message: "Forbidden" });

//         const { title, uri } = req.body;
//         const file = req.file;

//         const result = await uploadFile(file.buffer.toString('base64'));

//         const music = await musicModel.create({
//             uri: result.url,
//             title,
//             artist: decoded.id
//         });

//         res.status(201).json({
//             message: "Music created successfully",
//             music: {
//                 id: music._id,
//                 title: music.title,
//                 uri: music.uri,
//                 artist: music.artist

//             }
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({ message: "Invalid token" });
//     }
// }

// export const createAlbum = async (req, res) => {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).json({ message: "Unauthorized" });
//     try {
//         const decoded = jwt.varify(token, process.env.JWT_SECRET);
//         if (decoded.role !== 'artist') return res.status(403).json({ message: "Forbidden" });
//         const { title, musicIds } = req.body;
//         const album = await albumModel.create({
//             title,
//             artist: decoded.id,
//             musics: musicIds
//         })
//         res.status(201).json({
//             message: "Album created successfully",
//             album: {
//                 id: album._id,
//                 title: album.title,
//                 artist: album.artist,
//                 musics: album.musics
//             }
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({ message: "Invalid token" });
//     }
// }

export const getAllMusics = async (req, res) => {
    // .populate('artist') -> it will fetch whole artist details as an object
    const musics = await musicModel
    .find()
    .skip(2) // pehle 2 musics ko skip kar dega, yani ki 3rd music se start karega
    .limit(20)
    .populate('artist', 'userName email'); // populate is used to get the userName and email of the artist instead of just artist id
    res.status(200).json({
        message: "Musics fetched successfully",
        musics: musics
        // musics: musics.map(music => ({
        //     id: music._id,
        //     title: music.title,
        //     uri: music.uri,
        //     artist: music.artist
        // }))
    })
}

export const getAllAlbums = async (req, res) => {
    const albums = await albumModel.find().select("title artist").populate('artist', 'userName email')
    // const albums = await albumModel.find().populate('artist', 'userName email').populate('musics', 'title uri');
    res.status(200).json({
        message: "Albums fetched successfully",
        albums: albums
    })
}

export const getAlbumById = async (req, res) => {
    const albumId = req.params.albumId;
    const albums = await albumModel.findById(albumId).populate('artist', 'userName email');
    res.status(200).json({
        message: "Albums fetched successfully",
        albums: albums
    })
}

export default createMusic;