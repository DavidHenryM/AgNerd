import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedCountOrderByAggregateInput } from "../inputs/BreedCountOrderByAggregateInput";
import { BreedMaxOrderByAggregateInput } from "../inputs/BreedMaxOrderByAggregateInput";
import { BreedMinOrderByAggregateInput } from "../inputs/BreedMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("BreedOrderByWithAggregationInput", {
  isAbstract: true,
})
export class BreedOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  class?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  livestockUnitId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => BreedCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: BreedCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => BreedMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: BreedMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => BreedMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: BreedMinOrderByAggregateInput | undefined;
}
