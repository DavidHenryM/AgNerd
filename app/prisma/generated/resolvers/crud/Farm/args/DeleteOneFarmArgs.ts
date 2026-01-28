import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FarmWhereUniqueInput } from "../../../inputs/FarmWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteOneFarmArgs {
  @TypeGraphQL.Field((_type) => FarmWhereUniqueInput, {
    nullable: false,
  })
  where!: FarmWhereUniqueInput;
}
