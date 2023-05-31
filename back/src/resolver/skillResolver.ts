import { Skill } from "../entity/skill";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import dataSource from "../utils";
@Resolver(Skill)
export class skillResolvers {
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
