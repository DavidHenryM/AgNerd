import * as TypeGraphQL from "type-graphql";

export enum PaddockScalarFieldEnum {
  id = "id",
  name = "name",
  areaHa = "areaHa",
  livestockUnitPositionId = "livestockUnitPositionId"
}
TypeGraphQL.registerEnumType(PaddockScalarFieldEnum, {
  name: "PaddockScalarFieldEnum",
  description: undefined,
});
