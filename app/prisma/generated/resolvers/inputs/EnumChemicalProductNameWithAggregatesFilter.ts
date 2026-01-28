import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumChemicalProductNameFilter } from "../inputs/NestedEnumChemicalProductNameFilter";
import { NestedEnumChemicalProductNameWithAggregatesFilter } from "../inputs/NestedEnumChemicalProductNameWithAggregatesFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { ChemicalProductName } from "../../enums/ChemicalProductName";

@TypeGraphQL.InputType("EnumChemicalProductNameWithAggregatesFilter", {})
export class EnumChemicalProductNameWithAggregatesFilter {
  @TypeGraphQL.Field((_type) => ChemicalProductName, {
    nullable: true,
  })
  equals?: "AVOMEC_PLUS_POUR_ON" | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalProductName], {
    nullable: true,
  })
  in?: "AVOMEC_PLUS_POUR_ON"[] | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalProductName], {
    nullable: true,
  })
  notIn?: "AVOMEC_PLUS_POUR_ON"[] | undefined;

  @TypeGraphQL.Field(
    (_type) => NestedEnumChemicalProductNameWithAggregatesFilter,
    {
      nullable: true,
    },
  )
  not?: NestedEnumChemicalProductNameWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedIntFilter, {
    nullable: true,
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumChemicalProductNameFilter, {
    nullable: true,
  })
  _min?: NestedEnumChemicalProductNameFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumChemicalProductNameFilter, {
    nullable: true,
  })
  _max?: NestedEnumChemicalProductNameFilter | undefined;
}
