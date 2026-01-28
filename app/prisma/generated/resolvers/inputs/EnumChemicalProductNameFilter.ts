import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumChemicalProductNameFilter } from "../inputs/NestedEnumChemicalProductNameFilter";
import { ChemicalProductName } from "../../enums/ChemicalProductName";

@TypeGraphQL.InputType("EnumChemicalProductNameFilter", {})
export class EnumChemicalProductNameFilter {
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

  @TypeGraphQL.Field((_type) => NestedEnumChemicalProductNameFilter, {
    nullable: true,
  })
  not?: NestedEnumChemicalProductNameFilter | undefined;
}
