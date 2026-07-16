import { Request, Response } from "express";
import { ProductService } from "../../application/use-cases/ProductService";
import { ProductRepositoryImpl } from "../../infrastructure/database/repositories/ProductRepositoryImpl";

const productService = new ProductService(new ProductRepositoryImpl());

export class ProductController {
    static async getAll(req: Request, res: Response) {
        const includeInactive = req.query.includeInactive === "true";
        const filters = {
            search: req.query.search as string,
            category: req.query.category as string
        };
        const products = await productService.getAllProducts(includeInactive, filters);
        res.json(products);
    }

    static async create(req: Request, res: Response) {
        const result = await productService.createProduct(req.body);
        res.json(result);
    }

    static async getOne(req: Request, res: Response) {
        const product = await productService.getProductById(Number(req.params.id));
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    }

    static async update(req: Request, res: Response) {
        const result = await productService.updateProduct(Number(req.params.id), req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    }

    static async delete(req: Request, res: Response) {
        const success = await productService.deleteProduct(Number(req.params.id));
        res.json({ success });
    }
}
