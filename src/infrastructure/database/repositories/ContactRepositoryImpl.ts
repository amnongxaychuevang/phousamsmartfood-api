import { BaseRepositoryImpl } from "./BaseRepositoryImpl";
import { Contact } from "../../../domain/entities/Contact";
import { IContactRepository } from "../../../domain/repositories/IContactRepository";
import { AppDataSource } from "../../../config/data-source";

export class ContactRepositoryImpl extends BaseRepositoryImpl<Contact> implements IContactRepository {
    constructor() {
        super(AppDataSource.getRepository(Contact));
    }
}
