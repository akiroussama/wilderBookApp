import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dataSource from "./utils";
import { buildSchema } from "type-graphql";
import { skillResolvers } from "./resolver/skillResolver";
import { WilderResolver } from "./resolver/wilderResolver";
const port = 4000;

export const startServer = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [WilderResolver, skillResolvers],
  });
  const server = new ApolloServer({
    schema,

    // subscriptions
  });

  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port },
    });
    console.log(`🚀  Server ready at ${url}`);
  } catch (err) {
    console.log("Error starting the server");
  }
};
