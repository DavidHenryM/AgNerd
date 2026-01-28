import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyCountOrderByAggregateInput } from "../inputs/PregnancyCountOrderByAggregateInput";
import { PregnancyMaxOrderByAggregateInput } from "../inputs/PregnancyMaxOrderByAggregateInput";
import { PregnancyMinOrderByAggregateInput } from "../inputs/PregnancyMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("PregnancyOrderByWithAggregationInput", {})
export class PregnancyOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  earliestPossibleConception?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  latestPossibleConception?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  conception?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  dueDate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  earliestPossibleBirth?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  latestPossibleBirth?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  parentId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  pregnancySireId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => PregnancyCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: PregnancyCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: PregnancyMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: PregnancyMinOrderByAggregateInput | undefined;
}
