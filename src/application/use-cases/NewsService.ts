import { INewsRepository } from "../../domain/repositories/INewsRepository";
import { News } from "../../domain/entities/News";

export class NewsService {
    constructor(private readonly newsRepo: INewsRepository) {}

    async getAllNews(includeInactive: boolean): Promise<News[]> {
        return await this.newsRepo.findAll(includeInactive ? {} : { where: { isActive: true } });
    }

    async getNewsById(id: number): Promise<News | null> {
        return await this.newsRepo.findById(id);
    }

    async createNews(data: any): Promise<News> {
        return await this.newsRepo.create(data);
    }

    async updateNews(id: number, data: any): Promise<News | null> {
        return await this.newsRepo.update(id, data);
    }

    async deleteNews(id: number): Promise<boolean> {
        return await this.newsRepo.delete(id);
    }
}
