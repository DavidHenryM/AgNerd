import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Measurement } from "../../enums/Measurement";

@TypeGraphQL.InputType("EnumMeasurementFieldUpdateOperationsInput", {})
export class EnumMeasurementFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => Measurement, {
    nullable: true,
  })
  set?:
    | "CARCASE_WEIGHT"
    | "LIVE_WEIGHT"
    | "CIRCUMFERENCE"
    | "CALVING_UNASSISTED"
    | "GESTATION"
    | "DOCILE_CALVES"
    | "MUSCLE_AREA"
    | "FAT_DEPTH"
    | "SALEABLE_BEEF"
    | "INTRAMUSCULAR_FAT"
    | "FEED_CONSUMED"
    | "CLAW_SET"
    | "FOOT_ANGLE"
    | "LEG_ANGLE"
    | "JOINING_TO_CALVING"
    | "NET_PROFITABILITY"
    | undefined;
}
