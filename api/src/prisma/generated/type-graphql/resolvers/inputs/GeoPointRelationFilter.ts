import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointWhereInput } from "../inputs/GeoPointWhereInput";

@TypeGraphQL.InputType("GeoPointRelationFilter", {
  isAbstract: true,
})
export class GeoPointRelationFilter {
  @TypeGraphQL.Field((_type) => GeoPointWhereInput, {
    nullable: true,
  })
  is?: GeoPointWhereInput | undefined;

  @TypeGraphQL.Field((_type) => GeoPointWhereInput, {
    nullable: true,
  })
  isNot?: GeoPointWhereInput | undefined;
}
