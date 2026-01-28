import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedWhereInput } from "../inputs/BreedWhereInput";
import { EnumStockClassFilter } from "../inputs/EnumStockClassFilter";
import { LivestockUnitNullableRelationFilter } from "../inputs/LivestockUnitNullableRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("BreedWhereUniqueInput", {})
export class BreedWhereUniqueInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  livestockUnitId?: string | undefined;

  @TypeGraphQL.Field((_type) => [BreedWhereInput], {
    nullable: true,
  })
  AND?: BreedWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [BreedWhereInput], {
    nullable: true,
  })
  OR?: BreedWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [BreedWhereInput], {
    nullable: true,
  })
  NOT?: BreedWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  name?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumStockClassFilter, {
    nullable: true,
  })
  class?: EnumStockClassFilter | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitNullableRelationFilter, {
    nullable: true,
  })
  members?: LivestockUnitNullableRelationFilter | undefined;
}
