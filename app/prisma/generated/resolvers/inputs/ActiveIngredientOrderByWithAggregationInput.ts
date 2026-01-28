import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ActiveIngredientAvgOrderByAggregateInput } from "../inputs/ActiveIngredientAvgOrderByAggregateInput";
import { ActiveIngredientCountOrderByAggregateInput } from "../inputs/ActiveIngredientCountOrderByAggregateInput";
import { ActiveIngredientMaxOrderByAggregateInput } from "../inputs/ActiveIngredientMaxOrderByAggregateInput";
import { ActiveIngredientMinOrderByAggregateInput } from "../inputs/ActiveIngredientMinOrderByAggregateInput";
import { ActiveIngredientSumOrderByAggregateInput } from "../inputs/ActiveIngredientSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ActiveIngredientOrderByWithAggregationInput", {})
export class ActiveIngredientOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  ingredient?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  mgPermL?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  productId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => ActiveIngredientCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: ActiveIngredientCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => ActiveIngredientAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: ActiveIngredientAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => ActiveIngredientMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: ActiveIngredientMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => ActiveIngredientMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: ActiveIngredientMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => ActiveIngredientSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: ActiveIngredientSumOrderByAggregateInput | undefined;
}
