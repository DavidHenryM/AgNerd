import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AccountWhereInput } from "../../inputs/AccountWhereInput";

@TypeGraphQL.ArgsType()
export class UserCountAccountsArgs {
  @TypeGraphQL.Field((_type) => AccountWhereInput, {
    nullable: true,
  })
  where?: AccountWhereInput | undefined;
}
