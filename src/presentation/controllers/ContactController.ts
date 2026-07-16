import { Request, Response } from "express";
import { ContactService } from "../../application/use-cases/ContactService";
import { ContactRepositoryImpl } from "../../infrastructure/database/repositories/ContactRepositoryImpl";

const contactService = new ContactService(new ContactRepositoryImpl());

export class ContactController {
    static async getAll(req: Request, res: Response) {
        const contacts = await contactService.getAllContacts();
        res.json(contacts);
    }

    static async submit(req: Request, res: Response) {
        const result = await contactService.submitContact(req.body);
        res.json(result);
    }

    static async delete(req: Request, res: Response) {
        const success = await contactService.deleteContact(Number(req.params.id));
        res.json({ success });
    }
}
