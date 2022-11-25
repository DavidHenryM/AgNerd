import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WeightRecordCreateInput } from "../../../inputs/WeightRecordCreateInput";
import { WeightRecordUpdateInput } from "../../../inputs/WeightRecordUpdateInput";
import { WeightRecordWhereUniqueInput } from "../../../inputs/WeightRecordWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneWeightRecordArgs {
  @TypeGraphQL.Field(_type => WeightRecordWhereUniqueInput, {
    nullable: false
  })
  where!: WeightRecordWhereUniqueInput;

  @TypeGraphQL.Field(_type => WeightRecordCreateInput, {
    nullable: false
  })
  create!: WeightRecordCreateInput;

  @TypeGraphQL.Field(_type => WeightRecordUpdateInput, {
    nullable: false
  })
  update!: WeightRecordUpdateInput;
}
