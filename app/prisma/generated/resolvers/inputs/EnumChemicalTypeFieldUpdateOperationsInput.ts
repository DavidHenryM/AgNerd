import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalType } from "../../enums/ChemicalType";

@TypeGraphQL.InputType("EnumChemicalTypeFieldUpdateOperationsInput", {})
export class EnumChemicalTypeFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => ChemicalType, {
    nullable: true,
  })
  set?: "DRENCH" | "VACCINE" | "SUPPLEMENT" | "ANTIBIOTICS" | undefined;
}
