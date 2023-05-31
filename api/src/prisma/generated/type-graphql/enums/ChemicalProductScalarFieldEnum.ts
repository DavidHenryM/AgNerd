import * as TypeGraphQL from "type-graphql";

export enum ChemicalProductScalarFieldEnum {
  id = "id",
  chemicalTreatmentId = "chemicalTreatmentId",
  manufacturer = "manufacturer",
  product_name = "product_name",
  serial_number = "serial_number",
  volume_ml = "volume_ml",
  cost = "cost",
}
TypeGraphQL.registerEnumType(ChemicalProductScalarFieldEnum, {
  name: "ChemicalProductScalarFieldEnum",
  description: undefined,
});
