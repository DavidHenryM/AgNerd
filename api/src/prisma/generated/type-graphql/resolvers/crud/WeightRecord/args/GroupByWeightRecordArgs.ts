import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WeightRecordOrderByWithAggregationInput } from "../../../inputs/WeightRecordOrderByWithAggregationInput";
import { WeightRecordScalarWhereWithAggregatesInput } from "../../../inputs/WeightRecordScalarWhereWithAggregatesInput";
import { WeightRecordWhereInput } from "../../../inputs/WeightRecordWhereInput";
import { WeightRecordScalarFieldEnum } from "../../../../enums/WeightRecordScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByWeightRecordArgs {
  @TypeGraphQL.Field(_type => WeightRecordWhereInput, {
    nullable: true
  })
  where?: WeightRecordWhereInput | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: WeightRecordOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "weight" | "dateMeasured" | "method" | "livestockunitId">;

  @TypeGraphQL.Field(_type => WeightRecordScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: WeightRecordScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
