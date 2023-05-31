import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { GeoPointRelationFilter } from "../inputs/GeoPointRelationFilter";
import { PaddockRelationFilter } from "../inputs/PaddockRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("LivestockUnitPositionWhereInput", {
  isAbstract: true,
})
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

  @TypeGraphQL.Field((_type) => GeoPointRelationFilter, {
    nullable: true,
  })
  location?: GeoPointRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => PaddockRelationFilter, {
    nullable: true,
  })
  paddock?: PaddockRelationFilter | undefined;
}
