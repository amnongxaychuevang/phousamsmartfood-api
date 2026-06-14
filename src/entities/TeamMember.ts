import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TeamMember {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    role?: string;

    @Column("text", { nullable: true })
    bio_lo?: string;

    @Column("text", { nullable: true })
    bio_en?: string;

    @Column("text", { nullable: true })
    bio_vi?: string;

    @Column({ nullable: true })
    imageUrl?: string;

    @Column({ default: 0 })
    order!: number;
}
