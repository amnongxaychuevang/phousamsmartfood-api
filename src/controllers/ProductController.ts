import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Product";

export class ProductController {
    static async getAll(req: Request, res: Response) {
        const products = await AppDataSource.getRepository(Product).find({
            where: { isActive: true }
        });
        res.json(products);
    }

    static async create(req: Request, res: Response) {
        const product = AppDataSource.getRepository(Product).create(req.body);
        const result = await AppDataSource.getRepository(Product).save(product);
        res.json(result);
    }

    static async getOne(req: Request, res: Response) {
        const product = await AppDataSource.getRepository(Product).findOne({
            where: { id: Number(req.params.id) }
        });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    }

    static async update(req: Request, res: Response) {
        const repository = AppDataSource.getRepository(Product);
        const product = await repository.findOneBy({ id: Number(req.params.id) });
        if (product) {
            repository.merge(product, req.body);
            const result = await repository.save(product);
            res.json(result);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    }

    static async delete(req: Request, res: Response) {
        const result = await AppDataSource.getRepository(Product).delete(req.params.id);
        res.json(result);
    }
}
