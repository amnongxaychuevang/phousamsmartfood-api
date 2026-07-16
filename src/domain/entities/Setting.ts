import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Setting {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    key!: string;

    @Column("text", { nullable: true })
    value?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
