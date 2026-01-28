import * as TypeGraphQL from "type-graphql";

export enum Ingredient {
  TRICLABENDAZOLE = "TRICLABENDAZOLE",
  ABAMECTIN = "ABAMECTIN",
}
TypeGraphQL.registerEnumType(Ingredient, {
  name: "Ingredient",
  description: undefined,
});
