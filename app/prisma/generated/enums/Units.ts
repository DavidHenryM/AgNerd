import * as TypeGraphQL from "type-graphql";

export enum Units {
  KILOGRAMS = "KILOGRAMS",
  DAYS = "DAYS",
  PERCENTAGE = "PERCENTAGE",
  CENTIMETRES = "CENTIMETRES",
  SQUARE_CENTIMETRES = "SQUARE_CENTIMETRES",
  MILLIMETRES = "MILLIMETRES",
  KILOGRAMS_PER_DAY = "KILOGRAMS_PER_DAY",
  STRUCTURAL_SCORE = "STRUCTURAL_SCORE",
  DOLLARS_AUSTRALIAN = "DOLLARS_AUSTRALIAN",
}
TypeGraphQL.registerEnumType(Units, {
  name: "Units",
  description: undefined,
});
