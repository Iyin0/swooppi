import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Accounts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    first_name: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    last_name: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    email: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    password: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    user_type: string;

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