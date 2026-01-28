import * as TypeGraphQL from "type-graphql";

export enum ChemicalTreatmentScalarFieldEnum {
  id = "id",
  livestockUnitId = "livestockUnitId",
  treatmentDate = "treatmentDate",
  applicationMethod = "applicationMethod",
  chemicalProductId = "chemicalProductId",
  volumeMl = "volumeMl",
}
TypeGraphQL.registerEnumType(ChemicalTreatmentScalarFieldEnum, {
  name: "ChemicalTreatmentScalarFieldEnum",
  description: undefined,
});
