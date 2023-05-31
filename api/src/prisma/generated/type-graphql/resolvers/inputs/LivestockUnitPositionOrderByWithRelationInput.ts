import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointOrderByWithRelationInput } from "../inputs/GeoPointOrderByWithRelationInput";
import { PaddockOrderByWithRelationInput } from "../inputs/PaddockOrderByWithRelationInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("LivestockUnitPositionOrderByWithRelationInput", {
  isAbstract: true,
})
export class LivestockUnitPositionOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  date?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => GeoPointOrderByWithRelationInput, {
    nullable: true,
  })
  location?: GeoPointOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field((_type) => PaddockOrderByWithRelationInput, {
    nullable: true,
  })
  paddock?: PaddockOrderByWithRelationInput | undefined;
}
