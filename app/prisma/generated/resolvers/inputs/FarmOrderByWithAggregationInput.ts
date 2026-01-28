import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FarmCountOrderByAggregateInput } from "../inputs/FarmCountOrderByAggregateInput";
import { FarmMaxOrderByAggregateInput } from "../inputs/FarmMaxOrderByAggregateInput";
import { FarmMinOrderByAggregateInput } from "../inputs/FarmMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("FarmOrderByWithAggregationInput", {})
export class FarmOrderByWithAggregationInput {
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
  businessName?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  lotSectionPlan?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  abn?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  acn?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  pic?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => FarmCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: FarmCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => FarmMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: FarmMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => FarmMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: FarmMinOrderByAggregateInput | undefined;
}
