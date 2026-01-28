import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { GeoPointNullableRelationFilter } from "../inputs/GeoPointNullableRelationFilter";
import { LivestockUnitPositionWhereInput } from "../inputs/LivestockUnitPositionWhereInput";
import { PaddockNullableRelationFilter } from "../inputs/PaddockNullableRelationFilter";

@TypeGraphQL.InputType("LivestockUnitPositionWhereUniqueInput", {})
export class LivestockUnitPositionWhereUniqueInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

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
