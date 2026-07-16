import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    code!: string;

    @Column()
    name_lo!: string;

    @Column()
    name_en!: string;

    @Column()
    name_vi!: string;

    @Column({ nullable: true })
    imageUrl?: string;

    @Column({ default: true })
    isActive!: boolean;
}
