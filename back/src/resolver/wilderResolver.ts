import dataSource from "../utils";
import { Wilder } from "../entity/wilder";
import { Skill } from "../entity/skill";
import { Resolver, Query, Mutation, Arg } from "type-graphql";

@Resolver(Wilder)
export class wilderResolvers {
  @Query(() => [Wilder])
  async getAllWilders(): Promise<Wilder[]> {
    return await dataSource.manager.find(Wilder);
  }
  @Query(() => [Wilder])
  async getAllWildersSkills(): Promise<Wilder[]> {
    const allWilders = await dataSource.manager.find(Wilder, {
      relations: {
        grades: {
          skill: true,
        },
      },
    });
    console.log(JSON.stringify(allWilders, null, 2));
    return allWilders;
  }

  @Query(() => [Skill])
  async getAllSkills(): Promise<Skill[]> {
    return await dataSource.manager.find(Skill);
  }

  @Mutation(() => Skill)
  async createSkill(name: string): Promise<Skill> {
    console.log(Arg);
    const skillToCreate = new Skill();
    skillToCreate.name = Arg.name;
    return await dataSource.manager.save(Skill, skillToCreate);
  }
}
