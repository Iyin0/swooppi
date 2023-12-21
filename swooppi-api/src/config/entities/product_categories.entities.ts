import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ProductCategories {
    @PrimaryColumn()
    id: string

    @Column({
        nullable: false,
        type: 'varchar'
    })
    name: string
}