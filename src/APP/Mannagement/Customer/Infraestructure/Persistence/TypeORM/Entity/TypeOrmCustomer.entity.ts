import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class TypeOrmCustomerEntity {

    @PrimaryColumn({
        type: "varchar",
        length: 36
    })
    id: string;

    @Column({
        name: "name",
        type: "varchar",
        nullable: false
    })
    name: string;

    @Column({
        name: "contact",
        type: "varchar",
        nullable: true
    })
    contact: string;

    @Column({
        name: "cratedAt",
        type: "datetime",
        nullable: false
    })
    createdAt: Date;

    @Column({
        name: "updatedAt",
        type: "datetime",
        nullable: true
    })
    updatedAt;

    @Column({
        name: "deletedAt",
        type: "datetime",
        nullable: true
    })
    deletedAt;

    constructor(id: string, name: string, contact: string, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.createdAt = createdAt
     }

     static register(id: string, name: string, contact: string, createdAt: Date): TypeOrmCustomerEntity {
        return new TypeOrmCustomerEntity(id, name, contact, createdAt);
    }

}
