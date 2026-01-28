import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointWhereInput } from "../inputs/GeoPointWhereInput";

@TypeGraphQL.InputType("GeoPointListRelationFilter", {})
export class GeoPointListRelationFilter {
  @TypeGraphQL.Field((_type) => GeoPointWhereInput, {
    nullable: true,
  })
  every?: GeoPointWhereInput | undefined;

  @TypeGraphQL.Field((_type) => GeoPointWhereInput, {
    nullable: true,
  })
  some?: GeoPointWhereInput | undefined;

  @TypeGraphQL.Field((_type) => GeoPointWhereInput, {
    nullable: true,
  })
  none?: GeoPointWhereInput | undefined;
}
