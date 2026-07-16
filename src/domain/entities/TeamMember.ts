import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TeamMember {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name_lo!: string;

    @Column()
    name_en!: string;

    @Column()
    name_vi!: string;

    @Column({ nullable: true })
    role_lo?: string;

    @Column({ nullable: true })
    role_en?: string;

    @Column({ nullable: true })
    role_vi?: string;

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
