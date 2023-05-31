import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestAvgOrderByAggregateInput } from "../inputs/PregnancyTestAvgOrderByAggregateInput";
import { PregnancyTestCountOrderByAggregateInput } from "../inputs/PregnancyTestCountOrderByAggregateInput";
import { PregnancyTestMaxOrderByAggregateInput } from "../inputs/PregnancyTestMaxOrderByAggregateInput";
import { PregnancyTestMinOrderByAggregateInput } from "../inputs/PregnancyTestMinOrderByAggregateInput";
import { PregnancyTestSumOrderByAggregateInput } from "../inputs/PregnancyTestSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("PregnancyTestOrderByWithAggregationInput", {
  isAbstract: true,
})
export class PregnancyTestOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  testDate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  testType?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  resultDate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  result?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  pregnancyId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  cost?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => PregnancyTestCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: PregnancyTestCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyTestAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: PregnancyTestAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyTestMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: PregnancyTestMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyTestMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: PregnancyTestMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyTestSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: PregnancyTestSumOrderByAggregateInput | undefined;
}
