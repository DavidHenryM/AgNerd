import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FloatFilter } from "../inputs/FloatFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("GeoPointScalarWhereInput", {
  isAbstract: true
})
export class GeoPointScalarWhereInput {
  @TypeGraphQL.Field(_type => [GeoPointScalarWhereInput], {
    nullable: true
  })
  AND?: GeoPointScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [GeoPointScalarWhereInput], {
    nullable: true
  })
  OR?: GeoPointScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [GeoPointScalarWhereInput], {
    nullable: true
  })
  NOT?: GeoPointScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => FloatFilter, {
    nullable: true
  })
  latitude?: FloatFilter | undefined;

  @TypeGraphQL.Field(_type => FloatFilter, {
    nullable: true
  })
  longitude?: FloatFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  paddockId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  livestockUnitPositionId?: StringFilter | undefined;
}
