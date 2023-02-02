import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobOrderByRelationAggregateInput } from "../inputs/MobOrderByRelationAggregateInput";
import { PaddockOrderByWithRelationInput } from "../inputs/PaddockOrderByWithRelationInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("GrazeOrderByWithRelationInput", {
  isAbstract: true
})
export class GrazeOrderByWithRelationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  startDatetime?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  endDateTime?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => PaddockOrderByWithRelationInput, {
    nullable: true
  })
  paddock?: PaddockOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  paddockId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  mobIds?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => MobOrderByRelationAggregateInput, {
    nullable: true
  })
  mob?: MobOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  dseDaysPerHectare?: "asc" | "desc" | undefined;
}
