import { Request, Response } from "express";
import { AppDataSource } from "../../config/data-source";
import { User } from "../../domain/entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "phousam_secret_key_12345";
const JWT_EXPIRES_IN = "24h";

export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(400).json({ error: "Username and password are required" });
                return;
            }

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { username } });
            
            if (!user) {
                res.status(401).json({ error: "Invalid username or password" });
                return;
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ error: "Invalid username or password" });
                return;
            }

            const token = jwt.sign(
                { id: user.id, username: user.username },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            res.json({
                token,
                user: {
                    id: user.id,
                    username: user.username
                }
            });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
