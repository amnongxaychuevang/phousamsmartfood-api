import { IContactRepository } from "../../domain/repositories/IContactRepository";
import { Contact } from "../../domain/entities/Contact";

export class ContactService {
    constructor(private readonly contactRepo: IContactRepository) {}

    async getAllContacts(): Promise<Contact[]> {
        return await this.contactRepo.findAll();
    }

    async submitContact(data: any): Promise<Contact> {
        return await this.contactRepo.create(data);
    }

    async deleteContact(id: number): Promise<boolean> {
        return await this.contactRepo.delete(id);
    }
}
