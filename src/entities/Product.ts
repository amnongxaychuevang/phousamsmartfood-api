import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name_lo!: string;

    @Column()
    name_en!: string;

    @Column()
    name_vi!: string;

    @Column("text")
    description_lo!: string;

    @Column("text")
    description_en!: string;

    @Column("text")
    description_vi!: string;

    @Column("text", { nullable: true })
    content_lo?: string;

    @Column("text", { nullable: true })
    content_en?: string;

    @Column("text", { nullable: true })
    content_vi?: string;

    @Column()
    category!: string;

    @Column({ nullable: true })
    imageUrl?: string;

    @Column({ default: true })
    isActive!: boolean;
}
