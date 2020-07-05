import "reflect-metadata";
import { GraphQLModule } from "@graphql-modules/core";
import { ApolloServer } from "apollo-server";
import * as path from "path";

import RecipeModule from "./recipe/recipe.module";
import UserModule from "./user/user.module";
import { emitSchemaDefinitionFile } from "../../../src";

async function bootstrap() {
  // create main app module
  const { schema } = new GraphQLModule({
    // join other sub-modules
    imports: [RecipeModule, UserModule],
  });
  // emit combined schema file
  await emitSchemaDefinitionFile(path.resolve(__dirname, "../", "schema.gql"), schema);

  const server = new ApolloServer({
    schema,
    playground: true,
  });

  const { url } = await server.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap().catch(console.error);
