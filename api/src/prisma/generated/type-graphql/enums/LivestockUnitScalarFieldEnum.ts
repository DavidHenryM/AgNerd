import * as TypeGraphQL from "type-graphql";

export enum LivestockUnitScalarFieldEnum {
  id = "id",
  nlisid = "nlisid",
  "class" = "class",
  name = "name",
  comment = "comment",
  sex = "sex",
  birthdate = "birthdate",
  desexed = "desexed",
  parentId = "parentId",
  mobId = "mobId",
  pregnancyId = "pregnancyId",
  drySheepEquivalent = "drySheepEquivalent",
  purchasePrice = "purchasePrice"
}
TypeGraphQL.registerEnumType(LivestockUnitScalarFieldEnum, {
  name: "LivestockUnitScalarFieldEnum",
  description: undefined,
});
