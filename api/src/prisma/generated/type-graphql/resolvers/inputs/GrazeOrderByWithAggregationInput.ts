import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeAvgOrderByAggregateInput } from "../inputs/GrazeAvgOrderByAggregateInput";
import { GrazeCountOrderByAggregateInput } from "../inputs/GrazeCountOrderByAggregateInput";
import { GrazeMaxOrderByAggregateInput } from "../inputs/GrazeMaxOrderByAggregateInput";
import { GrazeMinOrderByAggregateInput } from "../inputs/GrazeMinOrderByAggregateInput";
import { GrazeSumOrderByAggregateInput } from "../inputs/GrazeSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("GrazeOrderByWithAggregationInput", {
  isAbstract: true,
})
export class GrazeOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  startDatetime?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  endDateTime?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  paddockId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  mobIds?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  dseDaysPerHectare?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => GrazeCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: GrazeCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => GrazeAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: GrazeAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => GrazeMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: GrazeMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => GrazeMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: GrazeMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => GrazeSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: GrazeSumOrderByAggregateInput | undefined;
}
