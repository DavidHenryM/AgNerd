import 'reflect-metadata';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import {resolvers} from '../../prisma/generated'
import { buildSchemaSync } from 'type-graphql'
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const schema = buildSchemaSync({
    resolvers,
    validate: false,
  });


const server = new ApolloServer({
  schema: schema,
});


// req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, { context: async req => ({ req, prisma }) });

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}