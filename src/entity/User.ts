import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email: string;

  @Column()
  login: string;

  @Column()
  password: string;

  constructor(email: string, login: string, password: string) {
    this.email = email;
    this.login = login;
    this.password = password;
  }
  /*
  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }*/
}
