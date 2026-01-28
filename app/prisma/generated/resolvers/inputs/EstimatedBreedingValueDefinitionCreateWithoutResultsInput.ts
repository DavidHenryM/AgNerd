import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EbvCategory } from "../../enums/EbvCategory";
import { Measurement } from "../../enums/Measurement";
import { Units } from "../../enums/Units";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueDefinitionCreateWithoutResultsInput",
  {},
)
export class EstimatedBreedingValueDefinitionCreateWithoutResultsInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  name!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  code!: string;

  @TypeGraphQL.Field((_type) => EbvCategory, {
    nullable: false,
  })
  category!:
    | "CALVING_EASE"
    | "GROWTH"
    | "FERTILITY"
    | "TEMPERAMENT"
    | "CARCASE"
    | "FEED_EFFICIENCY"
    | "STRUCTURAL"
    | "SELECTION_INDEX";

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  description!: string;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: false,
  })
  higherIsBetter!: boolean;

  @TypeGraphQL.Field((_type) => Units, {
    nullable: false,
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
    | "DOLLARS_AUSTRALIAN";

  @TypeGraphQL.Field((_type) => Measurement, {
    nullable: false,
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
    | "NET_PROFITABILITY";

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  angusTechFieldNameValue?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  angusTechFieldNamePercentile?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  angusTechFieldNameAccuracy?: string | undefined;
}
