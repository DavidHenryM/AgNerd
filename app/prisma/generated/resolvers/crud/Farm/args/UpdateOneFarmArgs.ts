import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FarmUpdateInput } from "../../../inputs/FarmUpdateInput";
import { FarmWhereUniqueInput } from "../../../inputs/FarmWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneFarmArgs {
  @TypeGraphQL.Field((_type) => FarmUpdateInput, {
    nullable: false,
  })
  data!: FarmUpdateInput;

  @TypeGraphQL.Field((_type) => FarmWhereUniqueInput, {
    nullable: false,
  })
  where!: FarmWhereUniqueInput;
}
