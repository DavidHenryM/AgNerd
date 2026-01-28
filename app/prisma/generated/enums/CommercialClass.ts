import * as TypeGraphQL from "type-graphql";

export enum CommercialClass {
  COMMERCIAL = "COMMERCIAL",
  SEEDSTOCK = "SEEDSTOCK",
  PET = "PET",
}
TypeGraphQL.registerEnumType(CommercialClass, {
  name: "CommercialClass",
  description: undefined,
});
