import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

export class CloudinaryController {
    static async deleteImage(req: Request, res: Response) {
        try {
            const { public_id } = req.body;
            if (!public_id) {
                return res.status(400).json({ message: "public_id is required" });
            }

            // Configure cloudinary with env variables
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
            });

            if (!process.env.CLOUDINARY_API_SECRET) {
                return res.status(500).json({ message: "Cloudinary API Secret not configured in backend .env" });
            }

            const result = await cloudinary.uploader.destroy(public_id);
            res.json(result);
        } catch (error: any) {
            console.error("Cloudinary Delete Error:", error);
            res.status(500).json({ message: "Error deleting image", error: error.message });
        }
    }
}
