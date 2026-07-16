import { ISettingRepository } from "../../domain/repositories/ISettingRepository";

export class SettingService {
    constructor(private readonly settingRepo: ISettingRepository) {}

    async getAllSettings(): Promise<Record<string, string>> {
        const settings = await this.settingRepo.findAll();
        const settingsObj: Record<string, string> = {};
        settings.forEach(s => {
            if (s.value) settingsObj[s.key] = s.value;
        });
        return settingsObj;
    }

    async saveSettings(settingsToSave: Record<string, string>): Promise<void> {
        if (!settingsToSave || typeof settingsToSave !== 'object') {
            throw new Error("Invalid payload");
        }
        await this.settingRepo.saveAll(settingsToSave);
    }
}
