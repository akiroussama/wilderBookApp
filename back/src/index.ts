import "reflect-metadata";
import dataSource from "./utils";
import { resolvers } from "./resolver/wilderResolver";
import { typeDefs } from "./schema/schema";
import { launchServer } from "./server";
const port = 4000;

launchServer(port);
