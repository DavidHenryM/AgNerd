import * as TypeGraphQL from "type-graphql";

export enum Sex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
TypeGraphQL.registerEnumType(Sex, {
  name: "Sex",
  description: undefined,
});
