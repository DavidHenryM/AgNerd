import * as TypeGraphQL from "type-graphql";

export enum WeightRecordScalarFieldEnum {
  id = "id",
  weight = "weight",
  dateMeasured = "dateMeasured",
  method = "method",
  livestockunitId = "livestockunitId"
}
TypeGraphQL.registerEnumType(WeightRecordScalarFieldEnum, {
  name: "WeightRecordScalarFieldEnum",
  description: undefined,
});
