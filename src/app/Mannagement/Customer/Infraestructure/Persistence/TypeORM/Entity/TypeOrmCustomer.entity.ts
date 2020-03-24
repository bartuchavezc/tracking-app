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

    constructor(id: string, name: string, contact: string) {
        this.id = id;
        this.name = name;
        this.contact = contact;
     }

     static register(id: string, name: string, contact: string): TypeOrmCustomerEntity {
        return new TypeOrmCustomerEntity(id, name, contact);
    }

}
