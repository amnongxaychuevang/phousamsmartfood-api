import { IBaseRepository } from "./IBaseRepository";
import { News } from "../entities/News";

export interface INewsRepository extends IBaseRepository<News> {
}
