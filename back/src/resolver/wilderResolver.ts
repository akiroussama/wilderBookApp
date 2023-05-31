import { Wilder } from "../entity/wilder";
import { Skill } from "../entity/skill";
import dataSource from "../utils";

export const resolvers = {
  Query: {
    getAllWilders: async () => {
      const allWilders = await dataSource.manager.find(Wilder, {
        relations: {
          grades: {
            skill: true,
          },
        },
      });
      console.log(JSON.stringify(allWilders, null, 2));
      return allWilders;
    },
    getAllSkills: async () => {
      const allSkills = await dataSource.manager.find(Skill);
      console.log(JSON.stringify(allSkills, null, 2));
      return allSkills;
    },
  },
  Mutation: {
    createSkill: async (_: any, args: any) => {
      console.log(args);
      const skillToCreate = new Skill();
      skillToCreate.name = args.name;
      return await dataSource.manager.save(Skill, skillToCreate);
    },
  },
};
