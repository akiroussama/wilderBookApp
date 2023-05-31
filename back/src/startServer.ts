import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { wilderResolvers } from "./resolver/wilderResolver";
import dataSource from "./utils";
import { buildSchema } from "type-graphql";
const port = 4000;

export const startServer = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [wilderResolvers],
  });
  const server = new ApolloServer({
    schema,
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
