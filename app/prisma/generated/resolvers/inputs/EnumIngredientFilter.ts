import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumIngredientFilter } from "../inputs/NestedEnumIngredientFilter";
import { Ingredient } from "../../enums/Ingredient";

@TypeGraphQL.InputType("EnumIngredientFilter", {})
export class EnumIngredientFilter {
  @TypeGraphQL.Field((_type) => Ingredient, {
    nullable: true,
  })
  equals?: "TRICLABENDAZOLE" | "ABAMECTIN" | undefined;

  @TypeGraphQL.Field((_type) => [Ingredient], {
    nullable: true,
  })
  in?: Array<"TRICLABENDAZOLE" | "ABAMECTIN"> | undefined;

  @TypeGraphQL.Field((_type) => [Ingredient], {
    nullable: true,
  })
  notIn?: Array<"TRICLABENDAZOLE" | "ABAMECTIN"> | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumIngredientFilter, {
    nullable: true,
  })
  not?: NestedEnumIngredientFilter | undefined;
}
