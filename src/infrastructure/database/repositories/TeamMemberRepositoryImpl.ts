import { BaseRepositoryImpl } from "./BaseRepositoryImpl";
import { TeamMember } from "../../../domain/entities/TeamMember";
import { ITeamMemberRepository } from "../../../domain/repositories/ITeamMemberRepository";
import { AppDataSource } from "../../../config/data-source";

export class TeamMemberRepositoryImpl extends BaseRepositoryImpl<TeamMember> implements ITeamMemberRepository {
    constructor() {
        super(AppDataSource.getRepository(TeamMember));
    }
}
