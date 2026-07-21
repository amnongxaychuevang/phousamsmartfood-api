import { AppDataSource } from "../../config/data-source";
import { Product } from "../../domain/entities/Product";
import { News } from "../../domain/entities/News";
import { Category } from "../../domain/entities/Category";
import { Contact } from "../../domain/entities/Contact";
import { PageVisit } from "../../domain/entities/PageVisit";
import { MoreThanOrEqual } from "typeorm";

export class DashboardService {
    async getSummary() {
        const productRepo = AppDataSource.getRepository(Product);
        const newsRepo = AppDataSource.getRepository(News);
        const categoryRepo = AppDataSource.getRepository(Category);
        const contactRepo = AppDataSource.getRepository(Contact);
        const pageVisitRepo = AppDataSource.getRepository(PageVisit);

        // Run queries in parallel for performance
        const [
            productCount,
            newsCount,
            categoryCount,
            unreadInquiryCount,
            topProducts,
            recentNews
        ] = await Promise.all([
            productRepo.count(),
            newsRepo.count(),
            categoryRepo.count(),
            contactRepo.count({ where: { isRead: false } }),
            
            // Top products (now sorting by real views)
            productRepo.find({
                order: { views: "DESC" }, 
                take: 3
            }),

            // Recent news (we can sort by date, but since views are requested we can fetch top viewed news if wanted, or just keep recent news)
            // Wait, the user asked for "recent news", but earlier they said "ຍອດເຂົ້າຊົມສູງສຸດ and ຂ່າວສານຫຼ້າສຸດ", so top products by views, and news by date.
            newsRepo.find({
                order: { date: "DESC" },
                take: 3
            })
        ]);

        // Get real traffic data for the last 7 days (Local Time)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        const yAgo = sevenDaysAgo.getFullYear();
        const mAgo = String(sevenDaysAgo.getMonth() + 1).padStart(2, '0');
        const dAgo = String(sevenDaysAgo.getDate()).padStart(2, '0');
        const dateString = `${yAgo}-${mAgo}-${dAgo}`;

        const visits = await pageVisitRepo.find({
            where: { date: MoreThanOrEqual(dateString) },
            order: { date: "ASC" }
        });

        // Fill in missing days with 0 views
        const trafficData = Array.from({ length: 7 }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            // TypeORM might return the date as a Date object or string depending on the driver
            const visit = visits.find(v => {
                const dateValue = v.date as any;
                const vDateStr = dateValue instanceof Date ? dateValue.toISOString().split("T")[0] : String(dateValue).split("T")[0];
                return vDateStr === formattedDate;
            });
            const views = visit ? visit.views : 0;
            return {
                label: formattedDate,
                visitors: Math.max(views, 0), // Just ensuring no negative
                percentage: (views / (Math.max(...visits.map(v => v.views), 100))) * 100 // Relative percentage for the graph max
            };
        });

        return {
            productCount,
            newsCount,
            categoryCount,
            unreadInquiryCount,
            topProducts,
            recentNews,
            trafficData
        };
    }
}
