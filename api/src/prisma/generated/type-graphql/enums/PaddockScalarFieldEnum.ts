import * as TypeGraphQL from "type-graphql";

export enum PaddockScalarFieldEnum {
  id = "id",
  name = "name"
}
TypeGraphQL.registerEnumType(PaddockScalarFieldEnum, {
  name: "PaddockScalarFieldEnum",
  description: undefined,
});
