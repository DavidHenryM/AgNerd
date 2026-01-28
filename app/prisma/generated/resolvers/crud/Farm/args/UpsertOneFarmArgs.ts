import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FarmCreateInput } from "../../../inputs/FarmCreateInput";
import { FarmUpdateInput } from "../../../inputs/FarmUpdateInput";
import { FarmWhereUniqueInput } from "../../../inputs/FarmWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneFarmArgs {
  @TypeGraphQL.Field((_type) => FarmWhereUniqueInput, {
    nullable: false,
  })
  where!: FarmWhereUniqueInput;

  @TypeGraphQL.Field((_type) => FarmCreateInput, {
    nullable: false,
  })
  create!: FarmCreateInput;

  @TypeGraphQL.Field((_type) => FarmUpdateInput, {
    nullable: false,
  })
  update!: FarmUpdateInput;
}
