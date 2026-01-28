import * as TypeGraphQL from "type-graphql";

export enum PregnancyScalarFieldEnum {
  id = "id",
  earliestPossibleConception = "earliestPossibleConception",
  latestPossibleConception = "latestPossibleConception",
  conception = "conception",
  dueDate = "dueDate",
  earliestPossibleBirth = "earliestPossibleBirth",
  latestPossibleBirth = "latestPossibleBirth",
  parentId = "parentId",
  pregnancySireId = "pregnancySireId",
}
TypeGraphQL.registerEnumType(PregnancyScalarFieldEnum, {
  name: "PregnancyScalarFieldEnum",
  description: undefined,
});
