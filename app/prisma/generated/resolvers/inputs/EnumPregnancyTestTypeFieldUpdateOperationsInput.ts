import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestType } from "../../enums/PregnancyTestType";

@TypeGraphQL.InputType("EnumPregnancyTestTypeFieldUpdateOperationsInput", {})
export class EnumPregnancyTestTypeFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => PregnancyTestType, {
    nullable: true,
  })
  set?: "MANUAL_RECTAL_PALPATATION" | "ULTRASOUND" | "BIOPRYN" | undefined;
}
