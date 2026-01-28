import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionCreateNestedOneWithoutLocationInput } from "../inputs/LivestockUnitPositionCreateNestedOneWithoutLocationInput";

@TypeGraphQL.InputType("GeoPointCreateWithoutPaddockInput", {})
export class GeoPointCreateWithoutPaddockInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  latitude!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  longitude!: number;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionCreateNestedOneWithoutLocationInput,
    {
      nullable: true,
    },
  )
  livestockUnitPosition?:
    | LivestockUnitPositionCreateNestedOneWithoutLocationInput
    | undefined;
}
