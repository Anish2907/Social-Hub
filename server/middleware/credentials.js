import { allowedOrigins } from "../config/allowedOrigins.js";

const credentials = (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
}

export default credentials;