import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFilter } from "../inputs/BoolFilter";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { DateTimeNullableFilter } from "../inputs/DateTimeNullableFilter";
import { EnumCommercialClassNullableFilter } from "../inputs/EnumCommercialClassNullableFilter";
import { EnumSexFilter } from "../inputs/EnumSexFilter";
import { EnumStockClassFilter } from "../inputs/EnumStockClassFilter";
import { EnumVisualIdColourNullableFilter } from "../inputs/EnumVisualIdColourNullableFilter";
import { FloatNullableFilter } from "../inputs/FloatNullableFilter";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";

@TypeGraphQL.InputType("LivestockUnitScalarWhereInput", {})
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
  nlisId?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  visualIdLine1?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  visualIdLine2?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  visualIdLine3?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumVisualIdColourNullableFilter, {
    nullable: true,
  })
  visualIdBackgroundColour?: EnumVisualIdColourNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumVisualIdColourNullableFilter, {
    nullable: true,
  })
  visualIdTextColour?: EnumVisualIdColourNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumStockClassFilter, {
    nullable: true,
  })
  class?: EnumStockClassFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumCommercialClassNullableFilter, {
    nullable: true,
  })
  commercialClass?: EnumCommercialClassNullableFilter | undefined;

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
  birthDate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolFilter, {
    nullable: true,
  })
  desexed?: BoolFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  sireId?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  damId?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  mobRef?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableListFilter, {
    nullable: true,
  })
  pregnancyId?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  drySheepEquivalent?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatNullableFilter, {
    nullable: true,
  })
  purchasePrice?: FloatNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
  purchaseDate?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  angusTechId?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolFilter, {
    nullable: true,
  })
  active?: BoolFilter | undefined;
}
