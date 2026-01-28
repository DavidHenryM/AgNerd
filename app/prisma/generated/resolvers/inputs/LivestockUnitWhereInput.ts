import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFilter } from "../inputs/BoolFilter";
import { BreedNullableRelationFilter } from "../inputs/BreedNullableRelationFilter";
import { ChemicalTreatmentListRelationFilter } from "../inputs/ChemicalTreatmentListRelationFilter";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { DateTimeNullableFilter } from "../inputs/DateTimeNullableFilter";
import { EnumCommercialClassNullableFilter } from "../inputs/EnumCommercialClassNullableFilter";
import { EnumSexFilter } from "../inputs/EnumSexFilter";
import { EnumStockClassFilter } from "../inputs/EnumStockClassFilter";
import { EnumVisualIdColourNullableFilter } from "../inputs/EnumVisualIdColourNullableFilter";
import { EstimatedBreedingValueResultListRelationFilter } from "../inputs/EstimatedBreedingValueResultListRelationFilter";
import { FloatNullableFilter } from "../inputs/FloatNullableFilter";
import { IntFilter } from "../inputs/IntFilter";
import { LivestockUnitListRelationFilter } from "../inputs/LivestockUnitListRelationFilter";
import { LivestockUnitNullableRelationFilter } from "../inputs/LivestockUnitNullableRelationFilter";
import { MobNullableRelationFilter } from "../inputs/MobNullableRelationFilter";
import { PregnancyListRelationFilter } from "../inputs/PregnancyListRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";
import { WeightRecordListRelationFilter } from "../inputs/WeightRecordListRelationFilter";

@TypeGraphQL.InputType("LivestockUnitWhereInput", {})
export class LivestockUnitWhereInput {
  @TypeGraphQL.Field((_type) => [LivestockUnitWhereInput], {
    nullable: true,
  })
  AND?: LivestockUnitWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitWhereInput], {
    nullable: true,
  })
  OR?: LivestockUnitWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitWhereInput], {
    nullable: true,
  })
  NOT?: LivestockUnitWhereInput[] | undefined;

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

  @TypeGraphQL.Field((_type) => BreedNullableRelationFilter, {
    nullable: true,
  })
  breed?: BreedNullableRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitNullableRelationFilter, {
    nullable: true,
  })
  sire?: LivestockUnitNullableRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitListRelationFilter, {
    nullable: true,
  })
  sired?: LivestockUnitListRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitNullableRelationFilter, {
    nullable: true,
  })
  dam?: LivestockUnitNullableRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitListRelationFilter, {
    nullable: true,
  })
  birthed?: LivestockUnitListRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => MobNullableRelationFilter, {
    nullable: true,
  })
  mob?: MobNullableRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => PregnancyListRelationFilter, {
    nullable: true,
  })
  pregnancy?: PregnancyListRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => WeightRecordListRelationFilter, {
    nullable: true,
  })
  weights?: WeightRecordListRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentListRelationFilter, {
    nullable: true,
  })
  treatments?: ChemicalTreatmentListRelationFilter | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultListRelationFilter,
    {
      nullable: true,
    },
  )
  estimatedBreedingValueResult?:
    | EstimatedBreedingValueResultListRelationFilter
    | undefined;
}
