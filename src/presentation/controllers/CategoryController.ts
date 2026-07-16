import { Request, Response } from "express";
import { CategoryService } from "../../application/use-cases/CategoryService";
import { CategoryRepositoryImpl } from "../../infrastructure/database/repositories/CategoryRepositoryImpl";

const categoryService = new CategoryService(new CategoryRepositoryImpl());

export class CategoryController {
    static async getAll(req: Request, res: Response) {
        const includeInactive = req.query.includeInactive === "true";
        const categories = await categoryService.getAllCategories(includeInactive);
        res.json(categories);
    }

    static async create(req: Request, res: Response) {
        try {
            const result = await categoryService.createCategory(req.body);
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getOne(req: Request, res: Response) {
        const categoryItem = await categoryService.getCategoryById(Number(req.params.id));
        if (categoryItem) {
            res.json(categoryItem);
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const result = await categoryService.updateCategory(Number(req.params.id), req.body);
            if (result) {
                res.json(result);
            } else {
                res.status(404).json({ message: "Category not found" });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        const success = await categoryService.deleteCategory(Number(req.params.id));
        res.json({ success });
    }
}
