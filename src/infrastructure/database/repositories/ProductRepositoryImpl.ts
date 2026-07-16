import { BaseRepositoryImpl } from "./BaseRepositoryImpl";
import { Product } from "../../../domain/entities/Product";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { AppDataSource } from "../../../config/data-source";

export class ProductRepositoryImpl extends BaseRepositoryImpl<Product> implements IProductRepository {
    constructor() {
        super(AppDataSource.getRepository(Product));
    }
}
