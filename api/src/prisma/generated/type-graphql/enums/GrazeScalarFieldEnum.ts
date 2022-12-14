import * as TypeGraphQL from "type-graphql";

export enum GrazeScalarFieldEnum {
  id = "id",
  startDatetime = "startDatetime",
  endDateTime = "endDateTime",
  paddockId = "paddockId",
  mobIds = "mobIds"
}
TypeGraphQL.registerEnumType(GrazeScalarFieldEnum, {
  name: "GrazeScalarFieldEnum",
  description: undefined,
});
