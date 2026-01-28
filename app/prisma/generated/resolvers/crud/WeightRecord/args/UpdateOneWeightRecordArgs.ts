import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WeightRecordUpdateInput } from "../../../inputs/WeightRecordUpdateInput";
import { WeightRecordWhereUniqueInput } from "../../../inputs/WeightRecordWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneWeightRecordArgs {
  @TypeGraphQL.Field((_type) => WeightRecordUpdateInput, {
    nullable: false,
  })
  data!: WeightRecordUpdateInput;

  @TypeGraphQL.Field((_type) => WeightRecordWhereUniqueInput, {
    nullable: false,
  })
  where!: WeightRecordWhereUniqueInput;
}
