import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { TeamMember } from "../entities/TeamMember";

export class TeamController {
    static async getAll(req: Request, res: Response) {
        const team = await AppDataSource.getRepository(TeamMember).find({
            order: { order: "ASC" }
        });
        res.json(team);
    }

    static async create(req: Request, res: Response) {
        const member = AppDataSource.getRepository(TeamMember).create(req.body);
        const result = await AppDataSource.getRepository(TeamMember).save(member);
        res.status(201).json(result);
    }

    static async update(req: Request, res: Response) {
        const repository = AppDataSource.getRepository(TeamMember);
        const member = await repository.findOneBy({ id: Number(req.params.id) });
        if (member) {
            repository.merge(member, req.body);
            const result = await repository.save(member);
            res.json(result);
        } else {
            res.status(404).json({ message: "Team member not found" });
        }
    }

    static async delete(req: Request, res: Response) {
        const result = await AppDataSource.getRepository(TeamMember).delete(req.params.id);
        res.json(result);
    }
}
