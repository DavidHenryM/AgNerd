import * as TypeGraphQL from "type-graphql";

export enum ChemicalProductScalarFieldEnum {
  id = "id",
  manufacturer = "manufacturer",
  productName = "productName",
  serialNumber = "serialNumber",
  batchNumber = "batchNumber",
  volumeMl = "volumeMl",
  cost = "cost",
  type = "type",
  witholdingPeriodDays = "witholdingPeriodDays",
}
TypeGraphQL.registerEnumType(ChemicalProductScalarFieldEnum, {
  name: "ChemicalProductScalarFieldEnum",
  description: undefined,
});
