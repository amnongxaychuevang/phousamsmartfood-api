import { Request, Response } from "express";
import { DashboardService } from "../../application/use-cases/DashboardService";

const dashboardService = new DashboardService();

export class DashboardController {
    static async getSummary(req: Request, res: Response) {
        try {
            const summary = await dashboardService.getSummary();
            res.json(summary);
        } catch (error) {
            console.error("Dashboard error:", error);
            res.status(500).json({ message: "Failed to fetch dashboard summary" });
        }
    }
}
