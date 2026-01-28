import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EbvCategory } from "../../enums/EbvCategory";
import { Measurement } from "../../enums/Measurement";
import { Units } from "../../enums/Units";

@TypeGraphQL.ObjectType("EstimatedBreedingValueDefinitionMinAggregate", {})
export class EstimatedBreedingValueDefinitionMinAggregate {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  code!: string | null;

  @TypeGraphQL.Field((_type) => EbvCategory, {
    nullable: true,
  })
  category!:
    | "CALVING_EASE"
    | "GROWTH"
    | "FERTILITY"
    | "TEMPERAMENT"
    | "CARCASE"
    | "FEED_EFFICIENCY"
    | "STRUCTURAL"
    | "SELECTION_INDEX"
    | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  description!: string | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  higherIsBetter!: boolean | null;

  @TypeGraphQL.Field((_type) => Units, {
    nullable: true,
  })
  units!:
    | "KILOGRAMS"
    | "DAYS"
    | "PERCENTAGE"
    | "CENTIMETRES"
    | "SQUARE_CENTIMETRES"
    | "MILLIMETRES"
    | "KILOGRAMS_PER_DAY"
    | "STRUCTURAL_SCORE"
    | "DOLLARS_AUSTRALIAN"
    | null;

  @TypeGraphQL.Field((_type) => Measurement, {
    nullable: true,
  })
  measurement!:
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
    | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  angusTechFieldNameValue!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  angusTechFieldNamePercentile!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  angusTechFieldNameAccuracy!: string | null;
}
