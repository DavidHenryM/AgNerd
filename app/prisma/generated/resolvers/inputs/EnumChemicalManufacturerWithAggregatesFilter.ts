import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumChemicalManufacturerFilter } from "../inputs/NestedEnumChemicalManufacturerFilter";
import { NestedEnumChemicalManufacturerWithAggregatesFilter } from "../inputs/NestedEnumChemicalManufacturerWithAggregatesFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { ChemicalManufacturer } from "../../enums/ChemicalManufacturer";

@TypeGraphQL.InputType("EnumChemicalManufacturerWithAggregatesFilter", {})
export class EnumChemicalManufacturerWithAggregatesFilter {
  @TypeGraphQL.Field((_type) => ChemicalManufacturer, {
    nullable: true,
  })
  equals?: "BOEHRINGER_INGLEHEIM" | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalManufacturer], {
    nullable: true,
  })
  in?: "BOEHRINGER_INGLEHEIM"[] | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalManufacturer], {
    nullable: true,
  })
  notIn?: "BOEHRINGER_INGLEHEIM"[] | undefined;

  @TypeGraphQL.Field(
    (_type) => NestedEnumChemicalManufacturerWithAggregatesFilter,
    {
      nullable: true,
    },
  )
  not?: NestedEnumChemicalManufacturerWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedIntFilter, {
    nullable: true,
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumChemicalManufacturerFilter, {
    nullable: true,
  })
  _min?: NestedEnumChemicalManufacturerFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumChemicalManufacturerFilter, {
    nullable: true,
  })
  _max?: NestedEnumChemicalManufacturerFilter | undefined;
}
