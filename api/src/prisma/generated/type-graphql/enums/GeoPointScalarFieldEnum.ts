import * as TypeGraphQL from "type-graphql";

export enum GeoPointScalarFieldEnum {
  id = "id",
  latitude = "latitude",
  longitude = "longitude",
  paddockId = "paddockId"
}
TypeGraphQL.registerEnumType(GeoPointScalarFieldEnum, {
  name: "GeoPointScalarFieldEnum",
  description: undefined,
});
