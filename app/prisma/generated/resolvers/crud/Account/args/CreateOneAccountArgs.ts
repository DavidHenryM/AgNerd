import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AccountCreateInput } from "../../../inputs/AccountCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneAccountArgs {
  @TypeGraphQL.Field((_type) => AccountCreateInput, {
    nullable: false,
  })
  data!: AccountCreateInput;
}
