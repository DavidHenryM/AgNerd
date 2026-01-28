import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Breed } from "../models/Breed";
import { ChemicalTreatment } from "../models/ChemicalTreatment";
import { EstimatedBreedingValueResult } from "../models/EstimatedBreedingValueResult";
import { Mob } from "../models/Mob";
import { Pregnancy } from "../models/Pregnancy";
import { WeightRecord } from "../models/WeightRecord";
import { CommercialClass } from "../enums/CommercialClass";
import { Sex } from "../enums/Sex";
import { StockClass } from "../enums/StockClass";
import { VisualIdColour } from "../enums/VisualIdColour";
import { LivestockUnitCount } from "../resolvers/outputs/LivestockUnitCount";

@TypeGraphQL.ObjectType("LivestockUnit", {})
export class LivestockUnit {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  nlisId?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  visualIdLine1?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  visualIdLine2?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  visualIdLine3?: string | null;

  @TypeGraphQL.Field((_type) => VisualIdColour, {
    nullable: true,
  })
  visualIdBackgroundColour?:
    | "WHITE"
    | "ORANGE"
    | "LIGHT_GREEN"
    | "PURPLE"
    | "YELLOW"
    | "RED"
    | "SKY_BLUE"
    | "BLACK"
    | null;

  @TypeGraphQL.Field((_type) => VisualIdColour, {
    nullable: true,
  })
  visualIdTextColour?:
    | "WHITE"
    | "ORANGE"
    | "LIGHT_GREEN"
    | "PURPLE"
    | "YELLOW"
    | "RED"
    | "SKY_BLUE"
    | "BLACK"
    | null;

  @TypeGraphQL.Field((_type) => StockClass, {
    nullable: false,
  })
  class!:
    | "CATTLE"
    | "SHEEP"
    | "GOAT"
    | "CAMEL"
    | "ALPACA"
    | "LLAMA"
    | "CHICKEN"
    | "DUCK"
    | "TURKEY";

  @TypeGraphQL.Field((_type) => CommercialClass, {
    nullable: true,
  })
  commercialClass?: "COMMERCIAL" | "SEEDSTOCK" | "PET" | null;

  breed?: Breed | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  comment?: string | null;

  @TypeGraphQL.Field((_type) => Sex, {
    nullable: false,
  })
  sex!: "MALE" | "FEMALE";

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  birthDate!: Date;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: false,
  })
  desexed!: boolean;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  sireId?: string | null;

  sire?: LivestockUnit | null;

  sired?: LivestockUnit[];

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  damId?: string | null;

  dam?: LivestockUnit | null;

  birthed?: LivestockUnit[];

  mob?: Mob | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  mobRef?: string | null;

  pregnancy?: Pregnancy[];

  @TypeGraphQL.Field((_type) => [String], {
    nullable: false,
  })
  pregnancyId!: string[];

  weights?: WeightRecord[];

  treatments?: ChemicalTreatment[];

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  drySheepEquivalent!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  purchasePrice?: number | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  purchaseDate?: Date | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  angusTechId?: string | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: false,
  })
  active!: boolean;

  estimatedBreedingValueResult?: EstimatedBreedingValueResult[];

  @TypeGraphQL.Field((_type) => LivestockUnitCount, {
    nullable: true,
  })
  _count?: LivestockUnitCount | null;
}
