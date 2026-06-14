import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { TeamMember } from "../entities/TeamMember";
import { v2 as cloudinary } from "cloudinary";

export class TeamController {
    static async getAll(req: Request, res: Response) {
        const team = await AppDataSource.getRepository(TeamMember).find({
            order: { order: "ASC" }
        });
        res.json(team);
    }

    static async create(req: Request, res: Response) {
        const member = AppDataSource.getRepository(TeamMember).create(req.body);
        const result = await AppDataSource.getRepository(TeamMember).save(member);
        res.status(201).json(result);
    }

    static async update(req: Request, res: Response) {
        const repository = AppDataSource.getRepository(TeamMember);
        const member = await repository.findOneBy({ id: Number(req.params.id) });
        if (member) {
            repository.merge(member, req.body);
            const result = await repository.save(member);
            res.json(result);
        } else {
            res.status(404).json({ message: "Team member not found" });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const repository = AppDataSource.getRepository(TeamMember);
            const member = await repository.findOneBy({ id: Number(req.params.id) });
            
            if (!member) {
                return res.status(404).json({ message: "Team member not found" });
            }

            // If the member has an image, delete it from Cloudinary
            if (member.imageUrl && member.imageUrl.includes('cloudinary.com')) {
                // Extract public_id from URL: e.g. .../v1234567/filename.jpg -> filename
                const urlParts = member.imageUrl.split('/');
                const filename = urlParts[urlParts.length - 1];
                const public_id = filename.split('.')[0];
                
                if (public_id) {
                    cloudinary.config({
                        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET
                    });
                    await cloudinary.uploader.destroy(public_id);
                }
            }

            const result = await repository.delete(req.params.id);
            res.json(result);
        } catch (error: any) {
            console.error("Error deleting member:", error);
            res.status(500).json({ message: "Error deleting member", error: error.message });
        }
    }
}
