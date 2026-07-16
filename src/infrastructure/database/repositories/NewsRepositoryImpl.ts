import { BaseRepositoryImpl } from "./BaseRepositoryImpl";
import { News } from "../../../domain/entities/News";
import { INewsRepository } from "../../../domain/repositories/INewsRepository";
import { AppDataSource } from "../../../config/data-source";

export class NewsRepositoryImpl extends BaseRepositoryImpl<News> implements INewsRepository {
    constructor() {
        super(AppDataSource.getRepository(News));
    }
}
