import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { Product } from "../../domain/entities/Product";

export class ProductService {
    constructor(private readonly productRepo: IProductRepository) {}

    async getAllProducts(includeInactive: boolean, filters?: { search?: string; category?: string }): Promise<Product[]> {
        const where: any = {};
        
        if (!includeInactive) {
            where.isActive = true;
        }
        
        if (filters?.category) {
            where.category = filters.category;
        }
        
        const products = await this.productRepo.findAll({ where });
        
        // Apply search filter in service layer (for multi-language search)
        if (filters?.search) {
            const searchLower = filters.search.toLowerCase();
            return products.filter(p => 
                p.name_en?.toLowerCase().includes(searchLower) ||
                p.name_lo?.includes(searchLower) ||
                p.name_vi?.toLowerCase().includes(searchLower)
            );
        }
        
        return products;
    }

    async getProductById(id: number): Promise<Product | null> {
        return await this.productRepo.findById(id);
    }

    async createProduct(data: any): Promise<Product> {
        if (data.category) {
            data.category = data.category.toUpperCase();
        }
        return await this.productRepo.create(data);
    }

    async updateProduct(id: number, data: any): Promise<Product | null> {
        if (data.category) {
            data.category = data.category.toUpperCase();
        }
        return await this.productRepo.update(id, data);
    }

    async deleteProduct(id: number): Promise<boolean> {
        return await this.productRepo.delete(id);
    }
}
