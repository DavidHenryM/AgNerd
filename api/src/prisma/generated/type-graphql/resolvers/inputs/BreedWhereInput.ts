import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EnumStockClassFilter } from "../inputs/EnumStockClassFilter";
import { LivestockUnitRelationFilter } from "../inputs/LivestockUnitRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("BreedWhereInput", {
  isAbstract: true,
})
export class BreedWhereInput {
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
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  name?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumStockClassFilter, {
    nullable: true,
  })
  class?: EnumStockClassFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  livestockUnitId?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitRelationFilter, {
    nullable: true,
  })
  members?: LivestockUnitRelationFilter | undefined;
}
