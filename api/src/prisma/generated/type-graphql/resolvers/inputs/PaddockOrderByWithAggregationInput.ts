import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockAvgOrderByAggregateInput } from "../inputs/PaddockAvgOrderByAggregateInput";
import { PaddockCountOrderByAggregateInput } from "../inputs/PaddockCountOrderByAggregateInput";
import { PaddockMaxOrderByAggregateInput } from "../inputs/PaddockMaxOrderByAggregateInput";
import { PaddockMinOrderByAggregateInput } from "../inputs/PaddockMinOrderByAggregateInput";
import { PaddockSumOrderByAggregateInput } from "../inputs/PaddockSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("PaddockOrderByWithAggregationInput", {
  isAbstract: true
})
export class PaddockOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  areaHa?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  livestockUnitPositionId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => PaddockCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: PaddockCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => PaddockAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: PaddockAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => PaddockMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: PaddockMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => PaddockMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: PaddockMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => PaddockSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: PaddockSumOrderByAggregateInput | undefined;
}
