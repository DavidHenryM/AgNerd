import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointOrderByRelationAggregateInput } from "../inputs/GeoPointOrderByRelationAggregateInput";
import { GrazeOrderByRelationAggregateInput } from "../inputs/GrazeOrderByRelationAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("PaddockOrderByWithRelationInput", {
  isAbstract: true
})
export class PaddockOrderByWithRelationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => GeoPointOrderByRelationAggregateInput, {
    nullable: true
  })
  polygon?: GeoPointOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(_type => GrazeOrderByRelationAggregateInput, {
    nullable: true
  })
  graze?: GrazeOrderByRelationAggregateInput | undefined;
}
