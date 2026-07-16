import { Request, Response } from "express";
import { TeamMemberService } from "../../application/use-cases/TeamMemberService";
import { TeamMemberRepositoryImpl } from "../../infrastructure/database/repositories/TeamMemberRepositoryImpl";

const teamService = new TeamMemberService(new TeamMemberRepositoryImpl());

export class TeamController {
    static async getAll(req: Request, res: Response) {
        const members = await teamService.getAllTeamMembers();
        res.json(members);
    }

    static async getOne(req: Request, res: Response) {
        const member = await teamService.getTeamMemberById(Number(req.params.id));
        if (member) {
            res.json(member);
        } else {
            res.status(404).json({ message: "Team member not found" });
        }
    }

    static async create(req: Request, res: Response) {
        const result = await teamService.createTeamMember(req.body);
        res.json(result);
    }

    static async update(req: Request, res: Response) {
        const result = await teamService.updateTeamMember(Number(req.params.id), req.body);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: "Team member not found" });
        }
    }

    static async delete(req: Request, res: Response) {
        const success = await teamService.deleteTeamMember(Number(req.params.id));
        res.json({ success });
    }
}
