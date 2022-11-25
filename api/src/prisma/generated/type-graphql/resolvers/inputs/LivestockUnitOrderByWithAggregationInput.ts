import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCountOrderByAggregateInput } from "../inputs/LivestockUnitCountOrderByAggregateInput";
import { LivestockUnitMaxOrderByAggregateInput } from "../inputs/LivestockUnitMaxOrderByAggregateInput";
import { LivestockUnitMinOrderByAggregateInput } from "../inputs/LivestockUnitMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("LivestockUnitOrderByWithAggregationInput", {
  isAbstract: true
})
export class LivestockUnitOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  nlisid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  comment?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  sex?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  birthdate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  desexed?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  parentId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  livestockUnitId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: LivestockUnitCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: LivestockUnitMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: LivestockUnitMinOrderByAggregateInput | undefined;
}
