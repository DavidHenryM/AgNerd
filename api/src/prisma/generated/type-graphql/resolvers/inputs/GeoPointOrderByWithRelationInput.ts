import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionOrderByWithRelationInput } from "../inputs/LivestockUnitPositionOrderByWithRelationInput";
import { PaddockOrderByWithRelationInput } from "../inputs/PaddockOrderByWithRelationInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("GeoPointOrderByWithRelationInput", {
  isAbstract: true,
})
export class GeoPointOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  latitude?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  longitude?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  paddockId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  livestockUnitPositionId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => PaddockOrderByWithRelationInput, {
    nullable: true,
  })
  paddock?: PaddockOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitPositionOrderByWithRelationInput, {
    nullable: true,
  })
  livestockUnitPosition?:
    | LivestockUnitPositionOrderByWithRelationInput
    | undefined;
}
