import { IBaseRepository } from "./IBaseRepository";
import { Setting } from "../entities/Setting";

export interface ISettingRepository extends IBaseRepository<Setting> {
    findByKey(key: string): Promise<Setting | null>;
    saveAll(settings: Record<string, string>): Promise<void>;
}
