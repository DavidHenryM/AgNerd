import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FloatWithAggregatesFilter } from "../inputs/FloatWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("GeoPointScalarWhereWithAggregatesInput", {
  isAbstract: true,
})
export class GeoPointScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [GeoPointScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: GeoPointScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GeoPointScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: GeoPointScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GeoPointScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: GeoPointScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatWithAggregatesFilter, {
    nullable: true,
  })
  latitude?: FloatWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatWithAggregatesFilter, {
    nullable: true,
  })
  longitude?: FloatWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  paddockId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  livestockUnitPositionId?: StringWithAggregatesFilter | undefined;
}
