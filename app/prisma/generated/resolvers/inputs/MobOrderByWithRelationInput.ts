import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeOrderByRelationAggregateInput } from "../inputs/GrazeOrderByRelationAggregateInput";
import { LivestockUnitOrderByRelationAggregateInput } from "../inputs/LivestockUnitOrderByRelationAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("MobOrderByWithRelationInput", {})
export class MobOrderByWithRelationInput {
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
  comment?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  grazeIds?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitOrderByRelationAggregateInput, {
    nullable: true,
  })
  members?: LivestockUnitOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => GrazeOrderByRelationAggregateInput, {
    nullable: true,
  })
  graze?: GrazeOrderByRelationAggregateInput | undefined;
}
