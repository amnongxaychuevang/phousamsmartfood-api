import { Request, Response } from "express";
import { SettingService } from "../../application/use-cases/SettingService";
import { SettingRepositoryImpl } from "../../infrastructure/database/repositories/SettingRepositoryImpl";

const settingService = new SettingService(new SettingRepositoryImpl());

export class SettingController {
    static async getAll(req: Request, res: Response) {
        try {
            const settingsObj = await settingService.getAllSettings();
            res.json(settingsObj);
        } catch (error) {
            console.error("Error fetching settings:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async save(req: Request, res: Response) {
        try {
            await settingService.saveSettings(req.body);
            res.json({ message: "Settings saved successfully" });
        } catch (error: any) {
            console.error("Error saving settings:", error);
            res.status(error.message === "Invalid payload" ? 400 : 500).json({ message: error.message || "Internal server error" });
        }
    }
}
