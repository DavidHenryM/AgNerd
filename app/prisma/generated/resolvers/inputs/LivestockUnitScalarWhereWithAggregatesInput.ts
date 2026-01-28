import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolWithAggregatesFilter } from "../inputs/BoolWithAggregatesFilter";
import { DateTimeNullableWithAggregatesFilter } from "../inputs/DateTimeNullableWithAggregatesFilter";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { EnumCommercialClassNullableWithAggregatesFilter } from "../inputs/EnumCommercialClassNullableWithAggregatesFilter";
import { EnumSexWithAggregatesFilter } from "../inputs/EnumSexWithAggregatesFilter";
import { EnumStockClassWithAggregatesFilter } from "../inputs/EnumStockClassWithAggregatesFilter";
import { EnumVisualIdColourNullableWithAggregatesFilter } from "../inputs/EnumVisualIdColourNullableWithAggregatesFilter";
import { FloatNullableWithAggregatesFilter } from "../inputs/FloatNullableWithAggregatesFilter";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("LivestockUnitScalarWhereWithAggregatesInput", {})
export class LivestockUnitScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [LivestockUnitScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: LivestockUnitScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: LivestockUnitScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: LivestockUnitScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  nlisId?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  visualIdLine1?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  visualIdLine2?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  visualIdLine3?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(
    (_type) => EnumVisualIdColourNullableWithAggregatesFilter,
    {
      nullable: true,
    },
  )
  visualIdBackgroundColour?:
    | EnumVisualIdColourNullableWithAggregatesFilter
    | undefined;

  @TypeGraphQL.Field(
    (_type) => EnumVisualIdColourNullableWithAggregatesFilter,
    {
      nullable: true,
    },
  )
  visualIdTextColour?:
    | EnumVisualIdColourNullableWithAggregatesFilter
    | undefined;

  @TypeGraphQL.Field((_type) => EnumStockClassWithAggregatesFilter, {
    nullable: true,
  })
  class?: EnumStockClassWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(
    (_type) => EnumCommercialClassNullableWithAggregatesFilter,
    {
      nullable: true,
    },
  )
  commercialClass?: EnumCommercialClassNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  name?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  comment?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumSexWithAggregatesFilter, {
    nullable: true,
  })
  sex?: EnumSexWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  birthDate?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolWithAggregatesFilter, {
    nullable: true,
  })
  desexed?: BoolWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  sireId?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  damId?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  mobRef?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableListFilter, {
    nullable: true,
  })
  pregnancyId?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  drySheepEquivalent?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatNullableWithAggregatesFilter, {
    nullable: true,
  })
  purchasePrice?: FloatNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
  purchaseDate?: DateTimeNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  angusTechId?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolWithAggregatesFilter, {
    nullable: true,
  })
  active?: BoolWithAggregatesFilter | undefined;
}
