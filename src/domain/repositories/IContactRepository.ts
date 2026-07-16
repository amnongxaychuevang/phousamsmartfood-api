import { IBaseRepository } from "./IBaseRepository";
import { Contact } from "../entities/Contact";

export interface IContactRepository extends IBaseRepository<Contact> {
}
