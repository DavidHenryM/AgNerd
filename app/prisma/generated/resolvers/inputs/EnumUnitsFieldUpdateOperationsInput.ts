import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Units } from "../../enums/Units";

@TypeGraphQL.InputType("EnumUnitsFieldUpdateOperationsInput", {})
export class EnumUnitsFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => Units, {
    nullable: true,
  })
  set?:
    | "KILOGRAMS"
    | "DAYS"
    | "PERCENTAGE"
    | "CENTIMETRES"
    | "SQUARE_CENTIMETRES"
    | "MILLIMETRES"
    | "KILOGRAMS_PER_DAY"
    | "STRUCTURAL_SCORE"
    | "DOLLARS_AUSTRALIAN"
    | undefined;
}
