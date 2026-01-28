import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { SessionCreateManyUserInput } from "../inputs/SessionCreateManyUserInput";

@TypeGraphQL.InputType("SessionCreateManyUserInputEnvelope", {})
export class SessionCreateManyUserInputEnvelope {
  @TypeGraphQL.Field((_type) => [SessionCreateManyUserInput], {
    nullable: false,
  })
  data!: SessionCreateManyUserInput[];
}
