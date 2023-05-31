import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/wilderSchema";
import { resolvers } from "./resolver/wilderResolver";
import dataSource from "./utils";

const port = 4000;

export const startServer = async () => {
  await dataSource.initialize();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
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
