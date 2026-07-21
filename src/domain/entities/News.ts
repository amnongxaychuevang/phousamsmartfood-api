import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title_lo!: string;

    @Column()
    title_en!: string;

    @Column()
    title_vi!: string;

    @Column("text")
    content_lo!: string;

    @Column("text")
    content_en!: string;

    @Column("text")
    content_vi!: string;

    @Column({ nullable: true })
    imageUrl?: string;

    @CreateDateColumn()
    date!: Date;

    @Column({ default: true })
    isActive!: boolean;

    @Column({ default: 0 })
    views!: number;
}
