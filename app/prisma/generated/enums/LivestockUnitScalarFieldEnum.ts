import * as TypeGraphQL from "type-graphql";

export enum LivestockUnitScalarFieldEnum {
  id = "id",
  nlisId = "nlisId",
  visualIdLine1 = "visualIdLine1",
  visualIdLine2 = "visualIdLine2",
  visualIdLine3 = "visualIdLine3",
  visualIdBackgroundColour = "visualIdBackgroundColour",
  visualIdTextColour = "visualIdTextColour",
  "class" = "class",
  commercialClass = "commercialClass",
  name = "name",
  comment = "comment",
  sex = "sex",
  birthDate = "birthDate",
  desexed = "desexed",
  sireId = "sireId",
  damId = "damId",
  mobRef = "mobRef",
  pregnancyId = "pregnancyId",
  drySheepEquivalent = "drySheepEquivalent",
  purchasePrice = "purchasePrice",
  purchaseDate = "purchaseDate",
  angusTechId = "angusTechId",
  active = "active",
}
TypeGraphQL.registerEnumType(LivestockUnitScalarFieldEnum, {
  name: "LivestockUnitScalarFieldEnum",
  description: undefined,
});
