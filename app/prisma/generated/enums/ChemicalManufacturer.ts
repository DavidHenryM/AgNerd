import * as TypeGraphQL from "type-graphql";

export enum ChemicalManufacturer {
  BOEHRINGER_INGLEHEIM = "BOEHRINGER_INGLEHEIM",
}
TypeGraphQL.registerEnumType(ChemicalManufacturer, {
  name: "ChemicalManufacturer",
  description: undefined,
});
