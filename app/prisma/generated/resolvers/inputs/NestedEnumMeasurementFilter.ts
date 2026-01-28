import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Measurement } from "../../enums/Measurement";

@TypeGraphQL.InputType("NestedEnumMeasurementFilter", {})
export class NestedEnumMeasurementFilter {
  @TypeGraphQL.Field((_type) => Measurement, {
    nullable: true,
  })
  equals?:
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

  @TypeGraphQL.Field((_type) => [Measurement], {
    nullable: true,
  })
  in?:
    | Array<
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
      >
    | undefined;

  @TypeGraphQL.Field((_type) => [Measurement], {
    nullable: true,
  })
  notIn?:
    | Array<
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
      >
    | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumMeasurementFilter, {
    nullable: true,
  })
  not?: NestedEnumMeasurementFilter | undefined;
}
