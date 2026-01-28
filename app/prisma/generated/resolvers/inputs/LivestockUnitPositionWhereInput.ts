import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { GeoPointNullableRelationFilter } from "../inputs/GeoPointNullableRelationFilter";
import { PaddockNullableRelationFilter } from "../inputs/PaddockNullableRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("LivestockUnitPositionWhereInput", {})
export class LivestockUnitPositionWhereInput {
  @TypeGraphQL.Field((_type) => [LivestockUnitPositionWhereInput], {
    nullable: true,
  })
  AND?: LivestockUnitPositionWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitPositionWhereInput], {
    nullable: true,
  })
  OR?: LivestockUnitPositionWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitPositionWhereInput], {
    nullable: true,
  })
  NOT?: LivestockUnitPositionWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  date?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => GeoPointNullableRelationFilter, {
    nullable: true,
  })
  location?: GeoPointNullableRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => PaddockNullableRelationFilter, {
    nullable: true,
  })
  paddock?: PaddockNullableRelationFilter | undefined;
}
