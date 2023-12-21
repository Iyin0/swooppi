import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    vendor_id: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    name: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    description: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    ingredients: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    category_id: string;

    @Column({
        nullable: false,
        type: "float"
    })
    default_price: number;

    @Column({
        nullable: true,
        type: "float"
    })
    sales_price: number;

    @Column({
        nullable: false,
        type: "json"
    })
    product_image: any;

    @Column({
        nullable: false,
        type: "json"
    })
    required_options: any;

    @Column({
        nullable: false,
        type: "timestamp"
    })
    created_at: Date;

    @Column({
        nullable: true,
        type: "timestamp"
    })
    updated_at: Date
}