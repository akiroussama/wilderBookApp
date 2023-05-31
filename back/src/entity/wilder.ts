import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Grade } from "./grade";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Wilder {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Grade])
  @OneToMany(() => Grade, (grade) => grade.wilder)
  public grades: Grade[];
}
