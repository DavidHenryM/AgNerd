import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumUnitsFilter } from "../inputs/NestedEnumUnitsFilter";
import { NestedEnumUnitsWithAggregatesFilter } from "../inputs/NestedEnumUnitsWithAggregatesFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { Units } from "../../enums/Units";

@TypeGraphQL.InputType("EnumUnitsWithAggregatesFilter", {})
export class EnumUnitsWithAggregatesFilter {
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

  @TypeGraphQL.Field((_type) => NestedEnumUnitsWithAggregatesFilter, {
    nullable: true,
  })
  not?: NestedEnumUnitsWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedIntFilter, {
    nullable: true,
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumUnitsFilter, {
    nullable: true,
  })
  _min?: NestedEnumUnitsFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumUnitsFilter, {
    nullable: true,
  })
  _max?: NestedEnumUnitsFilter | undefined;
}
