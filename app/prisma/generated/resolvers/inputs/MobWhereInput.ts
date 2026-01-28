import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeListRelationFilter } from "../inputs/GrazeListRelationFilter";
import { LivestockUnitListRelationFilter } from "../inputs/LivestockUnitListRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";

@TypeGraphQL.InputType("MobWhereInput", {})
export class MobWhereInput {
  @TypeGraphQL.Field((_type) => [MobWhereInput], {
    nullable: true,
  })
  AND?: MobWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MobWhereInput], {
    nullable: true,
  })
  OR?: MobWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MobWhereInput], {
    nullable: true,
  })
  NOT?: MobWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  name?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  comment?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableListFilter, {
    nullable: true,
  })
  grazeIds?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitListRelationFilter, {
    nullable: true,
  })
  members?: LivestockUnitListRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => GrazeListRelationFilter, {
    nullable: true,
  })
  graze?: GrazeListRelationFilter | undefined;
}
