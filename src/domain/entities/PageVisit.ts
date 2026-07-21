import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class PageVisit {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "date", unique: true })
    date!: string;

    @Column({ default: 0 })
    views!: number;
}
