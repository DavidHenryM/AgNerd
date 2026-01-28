import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionCountOrderByAggregateInput } from "../inputs/LivestockUnitPositionCountOrderByAggregateInput";
import { LivestockUnitPositionMaxOrderByAggregateInput } from "../inputs/LivestockUnitPositionMaxOrderByAggregateInput";
import { LivestockUnitPositionMinOrderByAggregateInput } from "../inputs/LivestockUnitPositionMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("LivestockUnitPositionOrderByWithAggregationInput", {})
export class LivestockUnitPositionOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  date?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionCountOrderByAggregateInput,
    {
      nullable: true,
    },
  )
  _count?: LivestockUnitPositionCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitPositionMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: LivestockUnitPositionMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitPositionMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: LivestockUnitPositionMinOrderByAggregateInput | undefined;
}
