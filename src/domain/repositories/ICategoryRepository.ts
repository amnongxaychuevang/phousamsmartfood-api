import { IBaseRepository } from "./IBaseRepository";
import { Category } from "../entities/Category";

export interface ICategoryRepository extends IBaseRepository<Category> {
    findByCode(code: string): Promise<Category | null>;
}
