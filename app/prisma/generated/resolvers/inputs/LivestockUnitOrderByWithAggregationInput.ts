import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitAvgOrderByAggregateInput } from "../inputs/LivestockUnitAvgOrderByAggregateInput";
import { LivestockUnitCountOrderByAggregateInput } from "../inputs/LivestockUnitCountOrderByAggregateInput";
import { LivestockUnitMaxOrderByAggregateInput } from "../inputs/LivestockUnitMaxOrderByAggregateInput";
import { LivestockUnitMinOrderByAggregateInput } from "../inputs/LivestockUnitMinOrderByAggregateInput";
import { LivestockUnitSumOrderByAggregateInput } from "../inputs/LivestockUnitSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("LivestockUnitOrderByWithAggregationInput", {})
export class LivestockUnitOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  nlisId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  visualIdLine1?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  visualIdLine2?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  visualIdLine3?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  visualIdBackgroundColour?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  visualIdTextColour?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  class?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  commercialClass?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  comment?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  sex?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  birthDate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  desexed?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  sireId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  damId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  mobRef?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  pregnancyId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  drySheepEquivalent?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  purchasePrice?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  purchaseDate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  angusTechId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  active?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: LivestockUnitCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: LivestockUnitAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: LivestockUnitMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: LivestockUnitMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: LivestockUnitSumOrderByAggregateInput | undefined;
}
