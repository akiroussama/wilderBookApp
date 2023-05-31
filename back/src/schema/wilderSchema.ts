export const typeDefs = `
  type Wilder {
    name: String
    grades: [Grade]
  }
  type Skill {
    name: String
  }
  type Grade {
    grade: Int
    skill: Skill
  }
  type Query {
    getAllWilders: [Wilder]
    getAllSkills: [Skill]
  }
  type Mutation {
    createSkill(name: String): Skill
  }
`;
