import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LoraDeviceCountOrderByAggregateInput } from "../inputs/LoraDeviceCountOrderByAggregateInput";
import { LoraDeviceMaxOrderByAggregateInput } from "../inputs/LoraDeviceMaxOrderByAggregateInput";
import { LoraDeviceMinOrderByAggregateInput } from "../inputs/LoraDeviceMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("LoraDeviceOrderByWithAggregationInput", {
  isAbstract: true
})
export class LoraDeviceOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  deviceId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  deviceEui?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  appEui?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  appKey?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  manufacturer?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  partNumber?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  activationMethod?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => LoraDeviceCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: LoraDeviceCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => LoraDeviceMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: LoraDeviceMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => LoraDeviceMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: LoraDeviceMinOrderByAggregateInput | undefined;
}
