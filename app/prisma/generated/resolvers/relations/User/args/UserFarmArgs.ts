import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FarmWhereInput } from "../../../inputs/FarmWhereInput";

@TypeGraphQL.ArgsType()
export class UserFarmArgs {
  @TypeGraphQL.Field((_type) => FarmWhereInput, {
    nullable: true,
  })
  where?: FarmWhereInput | undefined;
}
