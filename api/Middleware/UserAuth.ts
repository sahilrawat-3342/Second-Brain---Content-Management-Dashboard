import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

async function verifyToken(req: any, res: any, next: any) {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({
            success: false,
            message: "No token provided",
        });
        return;
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        // jwt.verify can return string or JwtPayload. Ensure we have an object with an `id`.
        if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
            req.userId = decoded.id;
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid token payload",
            });
            return;
        }
        next();
        }catch(err){
            res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
}

export default verifyToken;
