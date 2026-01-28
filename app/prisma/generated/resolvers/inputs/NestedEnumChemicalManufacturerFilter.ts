import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalManufacturer } from "../../enums/ChemicalManufacturer";

@TypeGraphQL.InputType("NestedEnumChemicalManufacturerFilter", {})
export class NestedEnumChemicalManufacturerFilter {
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

  @TypeGraphQL.Field((_type) => NestedEnumChemicalManufacturerFilter, {
    nullable: true,
  })
  not?: NestedEnumChemicalManufacturerFilter | undefined;
}
