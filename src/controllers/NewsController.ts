import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { News } from "../entities/News";

export class NewsController {
    static async getAll(req: Request, res: Response) {
        const includeInactive = req.query.includeInactive === "true";
        const news = await AppDataSource.getRepository(News).find({
            ...(includeInactive ? {} : { where: { isActive: true } }),
            order: { date: "DESC" }
        });
        res.json(news);
    }

    static async getOne(req: Request, res: Response) {
        const id = parseInt(req.params.id as string);
        const post = await AppDataSource.getRepository(News).findOneBy({ id });
        if (!post) return res.status(404).json({ message: "News not found" });
        res.json(post);
    }

    static async create(req: Request, res: Response) {
        const post = AppDataSource.getRepository(News).create(req.body);
        const result = await AppDataSource.getRepository(News).save(post);
        res.status(201).json(result);
    }

    static async update(req: Request, res: Response) {
        const repository = AppDataSource.getRepository(News);
        const post = await repository.findOneBy({ id: Number(req.params.id) });
        if (post) {
            repository.merge(post, req.body);
            const result = await repository.save(post);
            res.json(result);
        } else {
            res.status(404).json({ message: "News not found" });
        }
    }

    static async delete(req: Request, res: Response) {
        const result = await AppDataSource.getRepository(News).delete(req.params.id);
        res.json(result);
    }
}
