import * as TypeGraphQL from "type-graphql";

export enum LoraDeviceScalarFieldEnum {
  id = "id",
  name = "name",
  deviceId = "deviceId",
  deviceEui = "deviceEui",
  appEui = "appEui",
  appKey = "appKey",
  manufacturer = "manufacturer",
  partNumber = "partNumber",
  activationMethod = "activationMethod"
}
TypeGraphQL.registerEnumType(LoraDeviceScalarFieldEnum, {
  name: "LoraDeviceScalarFieldEnum",
  description: undefined,
});
