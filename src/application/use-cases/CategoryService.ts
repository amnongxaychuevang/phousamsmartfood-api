import { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";
import { Category } from "../../domain/entities/Category";

export class CategoryService {
    constructor(private readonly categoryRepo: ICategoryRepository) {}

    async getAllCategories(includeInactive: boolean): Promise<Category[]> {
        return await this.categoryRepo.findAll(includeInactive ? {} : { where: { isActive: true } });
    }

    async getCategoryById(id: number): Promise<Category | null> {
        return await this.categoryRepo.findById(id);
    }

    private generateCategoryCode(name: string): string {
        // Generate code from name: take first 3 letters, replace spaces with underscores, make uppercase
        const cleanName = name.replace(/[^a-zA-Z]/g, '').toUpperCase();
        const prefix = cleanName.substring(0, 3).padEnd(3, 'X');
        const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}${randomSuffix}`;
    }

    async createCategory(data: any): Promise<Category> {
        // Auto-generate code if not provided
        if (!data.code) {
            const name = data.name_en || data.name_lo || data.name_vi || 'CAT';
            data.code = this.generateCategoryCode(name);
            
            // Ensure code is unique
            let isUnique = false;
            let attempts = 0;
            while (!isUnique && attempts < 10) {
                const existing = await this.categoryRepo.findByCode(data.code);
                if (!existing) {
                    isUnique = true;
                } else {
                    data.code = this.generateCategoryCode(name);
                    attempts++;
                }
            }
        }
        
        return await this.categoryRepo.create(data);
    }

    async updateCategory(id: number, data: any): Promise<Category | null> {
        return await this.categoryRepo.update(id, data);
    }

    async deleteCategory(id: number): Promise<boolean> {
        return await this.categoryRepo.delete(id);
    }
}
