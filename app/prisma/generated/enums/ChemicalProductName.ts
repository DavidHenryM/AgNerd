import * as TypeGraphQL from "type-graphql";

export enum ChemicalProductName {
  AVOMEC_PLUS_POUR_ON = "AVOMEC_PLUS_POUR_ON",
}
TypeGraphQL.registerEnumType(ChemicalProductName, {
  name: "ChemicalProductName",
  description: undefined,
});
