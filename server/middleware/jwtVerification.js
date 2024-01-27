import JWT from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.userId = decoded.userId;
        req.isAdmin = decoded.isAdmin;
        next();
    });
}

export { verifyJWT };