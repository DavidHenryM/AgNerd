import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EnumChemicalManufacturerWithAggregatesFilter } from "../inputs/EnumChemicalManufacturerWithAggregatesFilter";
import { EnumChemicalProductNameWithAggregatesFilter } from "../inputs/EnumChemicalProductNameWithAggregatesFilter";
import { EnumChemicalTypeWithAggregatesFilter } from "../inputs/EnumChemicalTypeWithAggregatesFilter";
import { FloatNullableWithAggregatesFilter } from "../inputs/FloatNullableWithAggregatesFilter";
import { IntNullableWithAggregatesFilter } from "../inputs/IntNullableWithAggregatesFilter";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("ChemicalProductScalarWhereWithAggregatesInput", {})
export class ChemicalProductScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(
    (_type) => [ChemicalProductScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  AND?: ChemicalProductScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [ChemicalProductScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  OR?: ChemicalProductScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [ChemicalProductScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  NOT?: ChemicalProductScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumChemicalManufacturerWithAggregatesFilter, {
    nullable: true,
  })
  manufacturer?: EnumChemicalManufacturerWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumChemicalProductNameWithAggregatesFilter, {
    nullable: true,
  })
  productName?: EnumChemicalProductNameWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  serialNumber?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  batchNumber?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableWithAggregatesFilter, {
    nullable: true,
  })
  volumeMl?: IntNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatNullableWithAggregatesFilter, {
    nullable: true,
  })
  cost?: FloatNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumChemicalTypeWithAggregatesFilter, {
    nullable: true,
  })
  type?: EnumChemicalTypeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  witholdingPeriodDays?: IntWithAggregatesFilter | undefined;
}
