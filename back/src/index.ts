import "reflect-metadata";
import { ApolloServer, gql } from "apollo-server";
import dataSource from "./utils";

import { Wilder } from "./entity/wilder";
import { Skill } from "./entity/skill";

const typeDefs = gql`
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
  }
  type Mutation {
    createSkill(name: String): Skill
  }
`;

const resolvers = {
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
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  /**
   * What's up with this embed: true option?
   * These are our recommended settings for using AS;
   * they aren't the defaults in AS3 for backwards-compatibility reasons but
   * will be the defaults in AS4. For production environments, use
   * ApolloServerPluginLandingPageProductionDefault instead.
   **/
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
