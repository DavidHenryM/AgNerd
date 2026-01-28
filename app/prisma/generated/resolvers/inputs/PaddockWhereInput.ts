import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FloatFilter } from "../inputs/FloatFilter";
import { GeoPointListRelationFilter } from "../inputs/GeoPointListRelationFilter";
import { GrazeListRelationFilter } from "../inputs/GrazeListRelationFilter";
import { LivestockUnitPositionNullableRelationFilter } from "../inputs/LivestockUnitPositionNullableRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("PaddockWhereInput", {})
export class PaddockWhereInput {
  @TypeGraphQL.Field((_type) => [PaddockWhereInput], {
    nullable: true,
  })
  AND?: PaddockWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PaddockWhereInput], {
    nullable: true,
  })
  OR?: PaddockWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PaddockWhereInput], {
    nullable: true,
  })
  NOT?: PaddockWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  name?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatFilter, {
    nullable: true,
  })
  areaHa?: FloatFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  livestockUnitPositionId?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => GeoPointListRelationFilter, {
    nullable: true,
  })
  polygon?: GeoPointListRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => GrazeListRelationFilter, {
    nullable: true,
  })
  graze?: GrazeListRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitPositionNullableRelationFilter, {
    nullable: true,
  })
  livestockUnitPosition?:
    | LivestockUnitPositionNullableRelationFilter
    | undefined;
}
