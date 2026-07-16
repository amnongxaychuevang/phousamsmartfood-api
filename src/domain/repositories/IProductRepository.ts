import { IBaseRepository } from "./IBaseRepository";
import { Product } from "../entities/Product";

export interface IProductRepository extends IBaseRepository<Product> {
    // Specific methods for Product can go here if needed
}
