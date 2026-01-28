import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitPositionOrderByWithAggregationInput } from "../../../inputs/LivestockUnitPositionOrderByWithAggregationInput";
import { LivestockUnitPositionScalarWhereWithAggregatesInput } from "../../../inputs/LivestockUnitPositionScalarWhereWithAggregatesInput";
import { LivestockUnitPositionWhereInput } from "../../../inputs/LivestockUnitPositionWhereInput";
import { LivestockUnitPositionScalarFieldEnum } from "../../../../enums/LivestockUnitPositionScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByLivestockUnitPositionArgs {
  @TypeGraphQL.Field((_type) => LivestockUnitPositionWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitPositionWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => [LivestockUnitPositionOrderByWithAggregationInput],
    {
      nullable: true,
    },
  )
  orderBy?: LivestockUnitPositionOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitPositionScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<"id" | "date">;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionScalarWhereWithAggregatesInput,
    {
      nullable: true,
    },
  )
  having?: LivestockUnitPositionScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
