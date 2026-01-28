import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FarmWhereUniqueInput } from "../../../inputs/FarmWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueFarmArgs {
  @TypeGraphQL.Field((_type) => FarmWhereUniqueInput, {
    nullable: false,
  })
  where!: FarmWhereUniqueInput;
}
