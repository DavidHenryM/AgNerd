import * as TypeGraphQL from "type-graphql";

export enum PregnancyTestType {
  MANUAL_RECTAL_PALPATATION = "MANUAL_RECTAL_PALPATATION",
  ULTRASOUND = "ULTRASOUND",
  BIOPRYN = "BIOPRYN"
}
TypeGraphQL.registerEnumType(PregnancyTestType, {
  name: "PregnancyTestType",
  description: undefined,
});
