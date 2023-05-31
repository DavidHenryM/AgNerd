import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFilter } from "../inputs/BoolFilter";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { EnumSexFilter } from "../inputs/EnumSexFilter";
import { EnumStockClassFilter } from "../inputs/EnumStockClassFilter";
import { FloatFilter } from "../inputs/FloatFilter";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";

@TypeGraphQL.InputType("LivestockUnitScalarWhereInput", {
  isAbstract: true,
})
export class LivestockUnitScalarWhereInput {
  @TypeGraphQL.Field((_type) => [LivestockUnitScalarWhereInput], {
    nullable: true,
  })
  AND?: LivestockUnitScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitScalarWhereInput], {
    nullable: true,
  })
  OR?: LivestockUnitScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitScalarWhereInput], {
    nullable: true,
  })
  NOT?: LivestockUnitScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  nlisid?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumStockClassFilter, {
    nullable: true,
  })
  class?: EnumStockClassFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  name?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  comment?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumSexFilter, {
    nullable: true,
  })
  sex?: EnumSexFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  birthdate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolFilter, {
    nullable: true,
  })
  desexed?: BoolFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  parentId?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  mobId?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableListFilter, {
    nullable: true,
  })
  pregnancyId?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  drySheepEquivalent?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatFilter, {
    nullable: true,
  })
  purchasePrice?: FloatFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  purchaseDate?: DateTimeFilter | undefined;
}
