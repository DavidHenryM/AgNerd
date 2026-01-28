import * as TypeGraphQL from "type-graphql";

export enum UserScalarFieldEnum {
  id = "id",
  name = "name",
  email = "email",
  emailVerified = "emailVerified",
  image = "image",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  firstName = "firstName",
  preferredName = "preferredName",
  lastName = "lastName",
  farmId = "farmId",
}
TypeGraphQL.registerEnumType(UserScalarFieldEnum, {
  name: "UserScalarFieldEnum",
  description: undefined,
});
