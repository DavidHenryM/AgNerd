import * as TypeGraphQL from "type-graphql";

export enum ChemicalType {
  DRENCH = "DRENCH",
  VACCINE = "VACCINE",
  SUPPLEMENT = "SUPPLEMENT",
  ANTIBIOTICS = "ANTIBIOTICS",
}
TypeGraphQL.registerEnumType(ChemicalType, {
  name: "ChemicalType",
  description: undefined,
});
