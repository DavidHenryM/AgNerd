import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CommercialClass } from "../../enums/CommercialClass";
import { Sex } from "../../enums/Sex";
import { StockClass } from "../../enums/StockClass";
import { VisualIdColour } from "../../enums/VisualIdColour";

@TypeGraphQL.ObjectType("LivestockUnitMinAggregate", {})
export class LivestockUnitMinAggregate {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  nlisId!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  visualIdLine1!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  visualIdLine2!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  visualIdLine3!: string | null;

  @TypeGraphQL.Field((_type) => VisualIdColour, {
    nullable: true,
  })
  visualIdBackgroundColour!:
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
  visualIdTextColour!:
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
    nullable: true,
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
    | "TURKEY"
    | null;

  @TypeGraphQL.Field((_type) => CommercialClass, {
    nullable: true,
  })
  commercialClass!: "COMMERCIAL" | "SEEDSTOCK" | "PET" | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  comment!: string | null;

  @TypeGraphQL.Field((_type) => Sex, {
    nullable: true,
  })
  sex!: "MALE" | "FEMALE" | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  birthDate!: Date | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  desexed!: boolean | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  sireId!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  damId!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  mobRef!: string | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  drySheepEquivalent!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  purchasePrice!: number | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  purchaseDate!: Date | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  angusTechId!: string | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  active!: boolean | null;
}
