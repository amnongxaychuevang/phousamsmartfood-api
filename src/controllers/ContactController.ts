import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Contact } from "../entities/Contact";

export class ContactController {
    static async submit(req: Request, res: Response) {
        try {
            const contact = AppDataSource.getRepository(Contact).create(req.body);
            const result = await AppDataSource.getRepository(Contact).save(contact);
            res.status(201).json({ message: "Message sent successfully", data: result });
        } catch (error) {
            res.status(500).json({ message: "Error submitting contact form", error });
        }
    }

    static async getAll(req: Request, res: Response) {
        const contacts = await AppDataSource.getRepository(Contact).find({
            order: { createdAt: "DESC" }
        });
        res.json(contacts);
    }
}
