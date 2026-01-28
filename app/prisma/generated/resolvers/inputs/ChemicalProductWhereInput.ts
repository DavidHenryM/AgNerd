import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ActiveIngredientListRelationFilter } from "../inputs/ActiveIngredientListRelationFilter";
import { ChemicalTreatmentListRelationFilter } from "../inputs/ChemicalTreatmentListRelationFilter";
import { EnumChemicalManufacturerFilter } from "../inputs/EnumChemicalManufacturerFilter";
import { EnumChemicalProductNameFilter } from "../inputs/EnumChemicalProductNameFilter";
import { EnumChemicalTypeFilter } from "../inputs/EnumChemicalTypeFilter";
import { FloatNullableFilter } from "../inputs/FloatNullableFilter";
import { IntFilter } from "../inputs/IntFilter";
import { IntNullableFilter } from "../inputs/IntNullableFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("ChemicalProductWhereInput", {})
export class ChemicalProductWhereInput {
  @TypeGraphQL.Field((_type) => [ChemicalProductWhereInput], {
    nullable: true,
  })
  AND?: ChemicalProductWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalProductWhereInput], {
    nullable: true,
  })
  OR?: ChemicalProductWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalProductWhereInput], {
    nullable: true,
  })
  NOT?: ChemicalProductWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumChemicalManufacturerFilter, {
    nullable: true,
  })
  manufacturer?: EnumChemicalManufacturerFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumChemicalProductNameFilter, {
    nullable: true,
  })
  productName?: EnumChemicalProductNameFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  serialNumber?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  batchNumber?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
  volumeMl?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatNullableFilter, {
    nullable: true,
  })
  cost?: FloatNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumChemicalTypeFilter, {
    nullable: true,
  })
  type?: EnumChemicalTypeFilter | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  witholdingPeriodDays?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => ActiveIngredientListRelationFilter, {
    nullable: true,
  })
  activeIngredients?: ActiveIngredientListRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentListRelationFilter, {
    nullable: true,
  })
  ChemicalTreatment?: ChemicalTreatmentListRelationFilter | undefined;
}
