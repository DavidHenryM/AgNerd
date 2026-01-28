import * as TypeGraphQL from "type-graphql";

export enum SessionScalarFieldEnum {
  id = "id",
  expiresAt = "expiresAt",
  token = "token",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  ipAddress = "ipAddress",
  userAgent = "userAgent",
  userId = "userId",
}
TypeGraphQL.registerEnumType(SessionScalarFieldEnum, {
  name: "SessionScalarFieldEnum",
  description: undefined,
});
