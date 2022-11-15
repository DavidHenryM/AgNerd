import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { resolvers } from "../dist/prisma/generated/type-graphql/index";
// import { IResolvers } from 'graphql-tools';

const schema = await buildSchema({
  resolvers: resolvers
});

console.log(schema);
const port = process.env.PORT || 9090;

const server = new ApolloServer({ 
  schema});

server.listen({ port }, () => console.log(`Server runs at: http://localhost:${port}`));

