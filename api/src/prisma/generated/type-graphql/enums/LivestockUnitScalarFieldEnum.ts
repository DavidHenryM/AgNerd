import * as TypeGraphQL from "type-graphql";

export enum LivestockUnitScalarFieldEnum {
  id = "id",
  nlisid = "nlisid",
  name = "name",
  comment = "comment",
  sex = "sex",
  birthdate = "birthdate",
  desexed = "desexed",
  parentId = "parentId",
  livestockUnitId = "livestockUnitId"
}
TypeGraphQL.registerEnumType(LivestockUnitScalarFieldEnum, {
  name: "LivestockUnitScalarFieldEnum",
  description: undefined,
});
