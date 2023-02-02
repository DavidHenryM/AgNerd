import * as TypeGraphQL from "type-graphql";

export enum StockClass {
  CATTLE = "CATTLE",
  SHEEP = "SHEEP",
  GOAT = "GOAT",
  CAMEL = "CAMEL",
  ALPACA = "ALPACA",
  LLAMA = "LLAMA",
  CHICKEN = "CHICKEN",
  DUCK = "DUCK",
  TURKEY = "TURKEY"
}
TypeGraphQL.registerEnumType(StockClass, {
  name: "StockClass",
  description: undefined,
});
