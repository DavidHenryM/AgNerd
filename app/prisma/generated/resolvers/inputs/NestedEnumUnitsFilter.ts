import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Units } from "../../enums/Units";

@TypeGraphQL.InputType("NestedEnumUnitsFilter", {})
export class NestedEnumUnitsFilter {
  @TypeGraphQL.Field((_type) => Units, {
    nullable: true,
  })
  equals?:
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

  @TypeGraphQL.Field((_type) => [Units], {
    nullable: true,
  })
  in?:
    | Array<
        | "KILOGRAMS"
        | "DAYS"
        | "PERCENTAGE"
        | "CENTIMETRES"
        | "SQUARE_CENTIMETRES"
        | "MILLIMETRES"
        | "KILOGRAMS_PER_DAY"
        | "STRUCTURAL_SCORE"
        | "DOLLARS_AUSTRALIAN"
      >
    | undefined;

  @TypeGraphQL.Field((_type) => [Units], {
    nullable: true,
  })
  notIn?:
    | Array<
        | "KILOGRAMS"
        | "DAYS"
        | "PERCENTAGE"
        | "CENTIMETRES"
        | "SQUARE_CENTIMETRES"
        | "MILLIMETRES"
        | "KILOGRAMS_PER_DAY"
        | "STRUCTURAL_SCORE"
        | "DOLLARS_AUSTRALIAN"
      >
    | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumUnitsFilter, {
    nullable: true,
  })
  not?: NestedEnumUnitsFilter | undefined;
}
