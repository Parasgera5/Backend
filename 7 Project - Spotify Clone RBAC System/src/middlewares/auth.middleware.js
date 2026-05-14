import jwt from "jsonwebtoken";

const authArtist = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'artist') return res.status(403).json({ message: "Forbidden" });
        req.user = decoded; // we are creating a user property inside the request
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid token - Unauthorized" });
    }
}
export default authArtist;

export const authUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'user' || decoded.role !== 'artist') return res.status(403).json({ message: "Forbidden" });
        req.user = decoded; // we are creating a user property inside the request
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid token - Unauthorized" });
    }

}


// middleware can read data coming from request
// middleware can modify data coming from request
// middleware can send response to client