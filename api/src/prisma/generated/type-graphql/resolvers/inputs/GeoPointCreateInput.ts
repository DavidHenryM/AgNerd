import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionCreateNestedOneWithoutLocationInput } from "../inputs/LivestockUnitPositionCreateNestedOneWithoutLocationInput";
import { PaddockCreateNestedOneWithoutPolygonInput } from "../inputs/PaddockCreateNestedOneWithoutPolygonInput";

@TypeGraphQL.InputType("GeoPointCreateInput", {
  isAbstract: true
})
export class GeoPointCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  latitude!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  longitude!: number;

  @TypeGraphQL.Field(_type => PaddockCreateNestedOneWithoutPolygonInput, {
    nullable: false
  })
  paddock!: PaddockCreateNestedOneWithoutPolygonInput;

  @TypeGraphQL.Field(_type => LivestockUnitPositionCreateNestedOneWithoutLocationInput, {
    nullable: false
  })
  livestockUnitPosition!: LivestockUnitPositionCreateNestedOneWithoutLocationInput;
}
