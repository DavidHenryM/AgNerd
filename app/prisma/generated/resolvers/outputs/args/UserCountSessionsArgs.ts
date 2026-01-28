import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { SessionWhereInput } from "../../inputs/SessionWhereInput";

@TypeGraphQL.ArgsType()
export class UserCountSessionsArgs {
  @TypeGraphQL.Field((_type) => SessionWhereInput, {
    nullable: true,
  })
  where?: SessionWhereInput | undefined;
}
