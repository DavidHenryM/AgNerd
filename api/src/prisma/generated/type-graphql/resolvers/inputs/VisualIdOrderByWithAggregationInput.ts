import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VisualIdAvgOrderByAggregateInput } from "../inputs/VisualIdAvgOrderByAggregateInput";
import { VisualIdCountOrderByAggregateInput } from "../inputs/VisualIdCountOrderByAggregateInput";
import { VisualIdMaxOrderByAggregateInput } from "../inputs/VisualIdMaxOrderByAggregateInput";
import { VisualIdMinOrderByAggregateInput } from "../inputs/VisualIdMinOrderByAggregateInput";
import { VisualIdSumOrderByAggregateInput } from "../inputs/VisualIdSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("VisualIdOrderByWithAggregationInput", {
  isAbstract: true
})
export class VisualIdOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  livestockUnitId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  colour?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  number?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => VisualIdCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: VisualIdCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => VisualIdAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: VisualIdAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => VisualIdMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: VisualIdMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => VisualIdMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: VisualIdMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => VisualIdSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: VisualIdSumOrderByAggregateInput | undefined;
}