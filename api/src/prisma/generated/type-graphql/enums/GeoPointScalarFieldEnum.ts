import * as TypeGraphQL from "type-graphql";

export enum GeoPointScalarFieldEnum {
  id = "id",
  latitude = "latitude",
  longitude = "longitude",
  paddockId = "paddockId",
  livestockUnitPositionId = "livestockUnitPositionId"
}
TypeGraphQL.registerEnumType(GeoPointScalarFieldEnum, {
  name: "GeoPointScalarFieldEnum",
  description: undefined,
});
