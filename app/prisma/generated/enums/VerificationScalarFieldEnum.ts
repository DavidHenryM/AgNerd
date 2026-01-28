import * as TypeGraphQL from "type-graphql";

export enum VerificationScalarFieldEnum {
  id = "id",
  identifier = "identifier",
  value = "value",
  expiresAt = "expiresAt",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}
TypeGraphQL.registerEnumType(VerificationScalarFieldEnum, {
  name: "VerificationScalarFieldEnum",
  description: undefined,
});
