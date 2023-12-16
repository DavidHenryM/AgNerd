import 'reflect-metadata';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import  {resolvers} from '../prisma/generated'
import { customResolvers } from '../prisma/customResolvers';
import { buildSchemaSync } from 'type-graphql'
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { GraphQLError } from 'graphql/error/GraphQLError';

dotenv.config()

const prisma = new PrismaClient();


const schema = buildSchemaSync({
    resolvers: [...resolvers, ...customResolvers],
    validate: false,
  });


async function authorize(request: NextRequest): Promise<boolean> {
  const bearerTokenString: string | undefined = process.env.BEARER_TOKENS;
  if (bearerTokenString) {
    const bearerTokens: Array<string> = bearerTokenString.split(',');
    const bearerToken: string = request.headers.get('authorization') || '';
    const token = bearerToken.split('Bearer ')[1];
    if (bearerTokens.includes(token)) {
      return true
    }
  }
  return false;
} 


const server = new ApolloServer({
  schema: schema,
});


const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async request => { 
    if (! (await authorize(request))){
      throw new GraphQLError('Not authorized', {
        extensions: {
          code: 'UNAUTHORISED',
          http: { status: 403 },
        },
      });
    }

    return {request, prisma}
   }
 });

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}