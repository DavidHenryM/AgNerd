import * as TypeGraphQL from "type-graphql";

export enum WeightRecordScalarFieldEnum {
  id = "id",
  weight = "weight",
  dateMeasured = "dateMeasured",
  method = "method",
  livestockUnitId = "livestockUnitId",
}
TypeGraphQL.registerEnumType(WeightRecordScalarFieldEnum, {
  name: "WeightRecordScalarFieldEnum",
  description: undefined,
});
