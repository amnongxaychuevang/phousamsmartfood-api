import { IBaseRepository } from "./IBaseRepository";
import { TeamMember } from "../entities/TeamMember";

export interface ITeamMemberRepository extends IBaseRepository<TeamMember> {
}
