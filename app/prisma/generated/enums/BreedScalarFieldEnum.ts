import * as TypeGraphQL from "type-graphql";

export enum BreedScalarFieldEnum {
  id = "id",
  name = "name",
  "class" = "class",
  livestockUnitId = "livestockUnitId",
}
TypeGraphQL.registerEnumType(BreedScalarFieldEnum, {
  name: "BreedScalarFieldEnum",
  description: undefined,
});
