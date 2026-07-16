import { BaseRepositoryImpl } from "./BaseRepositoryImpl";
import { Setting } from "../../../domain/entities/Setting";
import { ISettingRepository } from "../../../domain/repositories/ISettingRepository";
import { AppDataSource } from "../../../config/data-source";

export class SettingRepositoryImpl extends BaseRepositoryImpl<Setting> implements ISettingRepository {
    constructor() {
        super(AppDataSource.getRepository(Setting));
    }

    async findByKey(key: string): Promise<Setting | null> {
        return await this.typeOrmRepository.findOneBy({ key });
    }

    async saveAll(settingsObj: Record<string, string>): Promise<void> {
        for (const [key, value] of Object.entries(settingsObj)) {
            let setting = await this.findByKey(key);
            if (!setting) {
                setting = new Setting();
                setting.key = key;
            }
            setting.value = value as string;
            await this.typeOrmRepository.save(setting);
        }
    }
}
