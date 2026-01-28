import * as TypeGraphQL from "type-graphql";

export enum LoraActivationMethod {
  OTAA = "OTAA",
  ABP = "ABP",
}
TypeGraphQL.registerEnumType(LoraActivationMethod, {
  name: "LoraActivationMethod",
  description: undefined,
});
