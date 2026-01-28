import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointAvgOrderByAggregateInput } from "../inputs/GeoPointAvgOrderByAggregateInput";
import { GeoPointCountOrderByAggregateInput } from "../inputs/GeoPointCountOrderByAggregateInput";
import { GeoPointMaxOrderByAggregateInput } from "../inputs/GeoPointMaxOrderByAggregateInput";
import { GeoPointMinOrderByAggregateInput } from "../inputs/GeoPointMinOrderByAggregateInput";
import { GeoPointSumOrderByAggregateInput } from "../inputs/GeoPointSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("GeoPointOrderByWithAggregationInput", {})
export class GeoPointOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  latitude?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  longitude?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  paddockId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  livestockUnitPositionId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => GeoPointCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: GeoPointCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => GeoPointAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: GeoPointAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => GeoPointMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: GeoPointMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => GeoPointMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: GeoPointMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => GeoPointSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: GeoPointSumOrderByAggregateInput | undefined;
}
