import { Request, Response } from "express";
import { NewsService } from "../../application/use-cases/NewsService";
import { NewsRepositoryImpl } from "../../infrastructure/database/repositories/NewsRepositoryImpl";

const newsService = new NewsService(new NewsRepositoryImpl());

export class NewsController {
    static async getAll(req: Request, res: Response) {
        const includeInactive = req.query.includeInactive === "true";
        const news = await newsService.getAllNews(includeInactive);
        res.json(news);
    }

    static async create(req: Request, res: Response) {
        const result = await newsService.createNews(req.body);
        res.json(result);
    }

    static async getOne(req: Request, res: Response) {
        const newsItem = await newsService.getNewsById(Number(req.params.id));
        if (newsItem) {
            res.json(newsItem);
        } else {
            res.status(404).json({ message: "News not found" });
        }
    }

    static async update(req: Request, res: Response) {
        const result = await newsService.updateNews(Number(req.params.id), req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: "News not found" });
        }
    }

    static async delete(req: Request, res: Response) {
        const success = await newsService.deleteNews(Number(req.params.id));
        res.json({ success });
    }
}
