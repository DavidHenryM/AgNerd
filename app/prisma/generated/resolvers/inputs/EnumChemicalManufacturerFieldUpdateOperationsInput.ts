import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalManufacturer } from "../../enums/ChemicalManufacturer";

@TypeGraphQL.InputType("EnumChemicalManufacturerFieldUpdateOperationsInput", {})
export class EnumChemicalManufacturerFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => ChemicalManufacturer, {
    nullable: true,
  })
  set?: "BOEHRINGER_INGLEHEIM" | undefined;
}
