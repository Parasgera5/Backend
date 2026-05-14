import express from "express";
import createMusic, {createAlbum, getAllMusics, getAllAlbums, getAlbumById} from "../controllers/music.controller";
import multer from "multer";
import authArtist, { authUser } from "../middlewares/auth.middleware.js";

const upload = multer({
    storage: multer.memoryStorage(),
})

const router = express.Router();
router.post("/upload", authArtist, upload.single("music"), createMusic);
router.post("/album", authArtist, createAlbum);
// router.post("/upload", upload.single("music"), createMusic);
// router.post("/album", createAlbum);
router.get('/', authUser, getAllMusics);
router.get('/album', authUser, getAllAlbums);
router.get('/album/:albumId', authUser, getAlbumById);

export default router;