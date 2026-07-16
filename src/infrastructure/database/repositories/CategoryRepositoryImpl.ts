import { BaseRepositoryImpl } from "./BaseRepositoryImpl";
import { Category } from "../../../domain/entities/Category";
import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";
import { AppDataSource } from "../../../config/data-source";

export class CategoryRepositoryImpl extends BaseRepositoryImpl<Category> implements ICategoryRepository {
    constructor() {
        super(AppDataSource.getRepository(Category));
    }

    async findByCode(code: string): Promise<Category | null> {
        return await this.typeOrmRepository.findOne({ where: { code } });
    }
}
