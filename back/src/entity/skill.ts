import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Grade } from "./grade";
import { ObjectType, Field } from "type-graphql";
@ObjectType()
@Entity()
export class Skill {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Grade, (grade) => grade.skill)
  public grades: Grade[];
}
