import * as TypeGraphQL from "type-graphql";

export enum ChemicalTreatmentScalarFieldEnum {
  id = "id",
  livestockUnitId = "livestockUnitId",
  treatmentDate = "treatmentDate",
  applicationMethod = "applicationMethod",
  volume_ml = "volume_ml",
  witholdingPeriodDays = "witholdingPeriodDays"
}
TypeGraphQL.registerEnumType(ChemicalTreatmentScalarFieldEnum, {
  name: "ChemicalTreatmentScalarFieldEnum",
  description: undefined,
});
