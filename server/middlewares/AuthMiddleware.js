import jwt from "jsonwebtoken";


export const verifyToken = (request, response, next) => {
    const token = request.cookies.jwt;
    if (!token) {
        return response.status(401).send("Access Denied, You are not Authenticated.");
    }
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        console.log({ payload });
        if (err) {
            return response.status(403).send("Token is not Valid.");
        }
        request.userId = payload.userId;
        next();
    });
};