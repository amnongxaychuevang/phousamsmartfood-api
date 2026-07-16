import { Repository, ObjectLiteral, FindManyOptions, DeepPartial } from "typeorm";
import { IBaseRepository } from "../../../domain/repositories/IBaseRepository";

export class BaseRepositoryImpl<T extends ObjectLiteral> implements IBaseRepository<T> {
    constructor(protected readonly typeOrmRepository: Repository<T>) {}

    async findAll(options?: FindManyOptions<T>): Promise<T[]> {
        return await this.typeOrmRepository.find(options);
    }

    async findById(id: number): Promise<T | null> {
        // @ts-ignore - Assuming standard id field exists
        return await this.typeOrmRepository.findOneBy({ id });
    }

    async create(data: Partial<T>): Promise<T> {
        const entity = this.typeOrmRepository.create(data as DeepPartial<T>);
        return await this.typeOrmRepository.save(entity);
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        const entity = await this.findById(id);
        if (!entity) return null;
        this.typeOrmRepository.merge(entity, data as DeepPartial<T>);
        return await this.typeOrmRepository.save(entity);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.typeOrmRepository.delete(id);
        return result.affected !== null && result.affected !== undefined && result.affected > 0;
    }
}
