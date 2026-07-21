import { Request, Response } from "express";
import { AppDataSource } from "../../config/data-source";
import { Product } from "../../domain/entities/Product";
import { News } from "../../domain/entities/News";
import { PageVisit } from "../../domain/entities/PageVisit";

export class TrackingController {
    static async trackVisit(req: Request, res: Response) {
        try {
            const d = new Date();
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;
            const pageVisitRepo = AppDataSource.getRepository(PageVisit);

            let visit = await pageVisitRepo.findOneBy({ date: dateStr });
            if (!visit) {
                visit = pageVisitRepo.create({ date: dateStr, views: 1 });
            } else {
                visit.views += 1;
            }
            await pageVisitRepo.save(visit);

            res.json({ success: true });
        } catch (error) {
            console.error("Tracking visit error:", error);
            res.status(500).json({ success: false });
        }
    }

    static async trackProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const productRepo = AppDataSource.getRepository(Product);
            const product = await productRepo.findOneBy({ id: parseInt(id as string) });
            if (product) {
                product.views += 1;
                await productRepo.save(product);
            }
            res.json({ success: true });
        } catch (error) {
            console.error("Tracking product error:", error);
            res.status(500).json({ success: false });
        }
    }

    static async trackNews(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const newsRepo = AppDataSource.getRepository(News);
            const news = await newsRepo.findOneBy({ id: parseInt(id as string) });
            if (news) {
                news.views += 1;
                await newsRepo.save(news);
            }
            res.json({ success: true });
        } catch (error) {
            console.error("Tracking news error:", error);
            res.status(500).json({ success: false });
        }
    }
}
