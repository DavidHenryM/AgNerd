import * as TypeGraphQL from "type-graphql";

export enum AccountScalarFieldEnum {
  id = "id",
  accountId = "accountId",
  providerId = "providerId",
  userId = "userId",
  accessToken = "accessToken",
  refreshToken = "refreshToken",
  idToken = "idToken",
  accessTokenExpiresAt = "accessTokenExpiresAt",
  refreshTokenExpiresAt = "refreshTokenExpiresAt",
  scope = "scope",
  password = "password",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}
TypeGraphQL.registerEnumType(AccountScalarFieldEnum, {
  name: "AccountScalarFieldEnum",
  description: undefined,
});
