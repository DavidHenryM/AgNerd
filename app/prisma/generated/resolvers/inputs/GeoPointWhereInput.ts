import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FloatFilter } from "../inputs/FloatFilter";
import { LivestockUnitPositionNullableRelationFilter } from "../inputs/LivestockUnitPositionNullableRelationFilter";
import { PaddockRelationFilter } from "../inputs/PaddockRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("GeoPointWhereInput", {})
export class GeoPointWhereInput {
  @TypeGraphQL.Field((_type) => [GeoPointWhereInput], {
    nullable: true,
  })
  AND?: GeoPointWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GeoPointWhereInput], {
    nullable: true,
  })
  OR?: GeoPointWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GeoPointWhereInput], {
    nullable: true,
  })
  NOT?: GeoPointWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatFilter, {
    nullable: true,
  })
  latitude?: FloatFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatFilter, {
    nullable: true,
  })
  longitude?: FloatFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  paddockId?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  livestockUnitPositionId?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => PaddockRelationFilter, {
    nullable: true,
  })
  paddock?: PaddockRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitPositionNullableRelationFilter, {
    nullable: true,
  })
  livestockUnitPosition?:
    | LivestockUnitPositionNullableRelationFilter
    | undefined;
}
