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
        req.userId = decoded.id;
        next();
        }catch(err){
            res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
}

export default verifyToken;
