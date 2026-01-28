import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AccountCreateManyUserInput } from "../inputs/AccountCreateManyUserInput";

@TypeGraphQL.InputType("AccountCreateManyUserInputEnvelope", {})
export class AccountCreateManyUserInputEnvelope {
  @TypeGraphQL.Field((_type) => [AccountCreateManyUserInput], {
    nullable: false,
  })
  data!: AccountCreateManyUserInput[];
}
