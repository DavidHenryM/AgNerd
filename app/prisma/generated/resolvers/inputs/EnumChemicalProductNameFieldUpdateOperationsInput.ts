import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductName } from "../../enums/ChemicalProductName";

@TypeGraphQL.InputType("EnumChemicalProductNameFieldUpdateOperationsInput", {})
export class EnumChemicalProductNameFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => ChemicalProductName, {
    nullable: true,
  })
  set?: "AVOMEC_PLUS_POUR_ON" | undefined;
}
