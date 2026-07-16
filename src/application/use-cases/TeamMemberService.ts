import { ITeamMemberRepository } from "../../domain/repositories/ITeamMemberRepository";
import { TeamMember } from "../../domain/entities/TeamMember";

export class TeamMemberService {
    constructor(private readonly teamRepo: ITeamMemberRepository) {}

    async getAllTeamMembers(): Promise<TeamMember[]> {
        return await this.teamRepo.findAll();
    }

    async getTeamMemberById(id: number): Promise<TeamMember | null> {
        return await this.teamRepo.findById(id);
    }

    async createTeamMember(data: any): Promise<TeamMember> {
        return await this.teamRepo.create(data);
    }

    async updateTeamMember(id: number, data: any): Promise<TeamMember | null> {
        return await this.teamRepo.update(id, data);
    }

    async deleteTeamMember(id: number): Promise<boolean> {
        return await this.teamRepo.delete(id);
    }
}
