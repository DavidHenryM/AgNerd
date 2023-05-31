import * as TypeGraphQL from "type-graphql";

export enum PregnancyTestScalarFieldEnum {
  id = "id",
  testDate = "testDate",
  testType = "testType",
  resultDate = "resultDate",
  result = "result",
  pregnancyId = "pregnancyId",
  cost = "cost",
}
TypeGraphQL.registerEnumType(PregnancyTestScalarFieldEnum, {
  name: "PregnancyTestScalarFieldEnum",
  description: undefined,
});
