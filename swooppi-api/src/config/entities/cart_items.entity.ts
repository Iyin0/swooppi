import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartItems {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        nullable: false,
        type: 'varchar'
    })
    cart_id: string

    @Column({
        nullable: false,
        type: 'varchar'
    })
    product_id: string

    @Column({
        nullable: false,
        type: 'int'
    })
    quantity: number

    @Column({
        nullable: true,
        type: 'json'
    })
    required_options: any

    @Column({
        nullable: false,
        type: 'timestamp'
    })
    created_at: Date
}