import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WeightRecordWhereUniqueInput } from "../../../inputs/WeightRecordWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueWeightRecordOrThrowArgs {
  @TypeGraphQL.Field((_type) => WeightRecordWhereUniqueInput, {
    nullable: false,
  })
  where!: WeightRecordWhereUniqueInput;
}
