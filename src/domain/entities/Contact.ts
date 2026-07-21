import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    subject?: string;

    @Column("text")
    message!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ default: false })
    isRead!: boolean;
}
