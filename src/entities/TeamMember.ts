import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TeamMember {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    role!: string;

    @Column("text", { nullable: true })
    bio?: string;

    @Column({ nullable: true })
    imageUrl?: string;

    @Column({ default: 0 })
    order!: number;
}
