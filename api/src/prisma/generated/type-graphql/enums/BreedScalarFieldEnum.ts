import * as TypeGraphQL from "type-graphql";

export enum BreedScalarFieldEnum {
  id = "id",
  name = "name",
  "class" = "class",
  memberId = "memberId"
}
TypeGraphQL.registerEnumType(BreedScalarFieldEnum, {
  name: "BreedScalarFieldEnum",
  description: undefined,
});
